const express = require("express");
const { status } = require("express/lib/response");
const app = express();
const port = 2525;
const importRepository = require('./repository/import_repository');
const featureRequestRepository = require('./repository/feature_request_repository');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('KVC-Hackathon Backend is running!');
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

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
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