const express = require("express");
const { status } = require("express/lib/response");
const cors = require('cors');
const app = express();
const port = 2525;
const importRepository = require('./repository/import_repository');
const featureRequestRepository = require('./repository/feature_request_repository');
const axios = require('axios');

// Enable CORS for all origins
app.use(cors({
  origin: '*', // Allow any origin
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('KVC-Hackathon Backend is running!');
});

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});


// Feature request endpoint
app.get('/feature_request', async (req, res) => {
    try {
        const result = await featureRequestRepository.getFeatureRequests();
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        console.error('Error in feature request endpoint:', error);
        res.status(500).json({
            success: false,
            message: `Failed to retrieve feature requests: ${error.message}`,
            error: error.toString()
        });
    }
});


// Feature request detail endpoint
app.get('/feature_request/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await featureRequestRepository.getFeatureRequestById(id);
        
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(result.status || 500).json(result);
        }
    } catch (error) {
        console.error(`Error in feature request detail endpoint:`, error);
        res.status(500).json({
            success: false,
            message: `Failed to retrieve feature request: ${error.message}`,
            error: error.toString()
        });
    }
});

// Generate prompt and call external API with feature request
app.get('/feature_request/:id/generate', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await featureRequestRepository.getFeatureRequestById(id);
        
        if (!result.success) {
            return res.status(result.status || 500).json(result);
        }

        const featureRequest = result.data;
        
        // Create prompt based on feature request
        const prompt = `Tôi nhận được feature request sau:

{
    "title": "${featureRequest.title}",
    "description": "${featureRequest.description}"
}
  

1. Tìm các Confluence liên quan, tóm tắt Confluence liên quan. Đưa vào related_confluence
2. Tìm các Ticket liên quan, tóm tắt ticket liên quan. Đưa vào related_tickets
3. Tìm ra hướng đi cho feature request, viết hướng đi của feature request vào feature_request_description.
4. Tạo các Subtask cho feature request, viết vào feature_request_subtask

Tất cả trả về theo định dạng json, sample:

{
  "feature_request_description": "Feature request description",
  "feature_request_subtask": [
    {
      "title": "Feature request substask 1 title",
      "description": "Feature request subtask 1 description"
    }
  ],
  "related_confluence": [
    {
      "id": "KR2-1234",
      "title": "Confluence title",
      "summary": "Confluence summary",
      "url": "https://sample.com"
    }
  ],
  "related_tickets": [
    {
      "id": "KR2-1234",
      "title": "Ticket title",
      "summary": "Ticket summary",
      "url": "https://sample.com"
    }
  ]
}

CHỈ ĐƯỢC PHÉP TRẢ LỜI BẰNG JSON. Không được giải thích hay thêm bất kỳ văn bản nào khác.`;

console.log("Generated prompt:", prompt);

        // Call external API
        const apiResponse = await axios.post('http://localhost:5670/api/v2/chat/completions', {
            messages: prompt,
            model: "gpt-4.1-mini-2025-04-14",
            chat_mode: 'chat_knowledge',
            chat_param: "jira_and_confluence"
        }, {
            headers: {
                'Authorization': 'Bearer dbgpt',
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        // Extract the content from the API response
        let resultContent;
        
        if (apiResponse.data && 
            apiResponse.data.choices && 
            apiResponse.data.choices.length > 0 && 
            apiResponse.data.choices[0].message && 
            apiResponse.data.choices[0].message.content) {
            
            const content = apiResponse.data.choices[0].message.content;
            
            // Try to extract and process the JSON content
            try {
                // Use our enhanced function to handle the JSON extraction
                const processedContent = unescapeJSONString(content);
                
                // Check if we got a valid result
                if (typeof processedContent === 'object' && processedContent !== null) {
                    // Successfully parsed as JSON object
                    resultContent = processedContent;
                } else {
                    // Got a string back, might not have been valid JSON
                    console.log("Content wasn't valid JSON, returning processed string");
                    resultContent = processedContent;
                }
            } catch (parseError) {
                console.error("Error processing content:", parseError);
                resultContent = { 
                    error: "Failed to process response content",
                    raw_content: content
                };
            }
        } else {
            resultContent = { 
                error: "No valid content in API response",
                response: apiResponse.data
            };
        }
        
        // Return the processed content
        res.status(200).json({
            success: true,
            data: resultContent,
        });
        
    } catch (error) {
        console.error(`Error generating prompt or calling API:`, error);
        res.status(500).json({
            success: false,
            message: `Failed to generate prompt or call API: ${error.message}`,
            error: error.toString()
        });
    }
});

// Import endpoint
app.post('/import', async (req, res) => {
    try {
        const result = await importRepository.importAllCollections();
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }

    } catch (error) {
        console.error('Error in import endpoint:', error);
        res.status(500).json({
            success: false,
            message: `Import failed: ${error.message}`,
            error: error.toString()
        });
    }
});

function unescapeJSONString(str) {
  // First, handle the case where the string contains a Markdown code block
  if (str.includes('```json')) {
    // Extract content between ```json and ``` markers
    const jsonMatch = str.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        // Parse to handle any escaped characters
        return JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.warn('Failed to parse extracted JSON, returning unescaped string');
        // If parsing fails, continue with unescaping the extracted content
        str = jsonMatch[1];
      }
    }
  }
  
  // Try to parse the string as JSON directly
  try {
    return JSON.parse(str);
  } catch (e) {
    console.warn('Failed to parse string as JSON, returning original string');
    return str;
  }
}