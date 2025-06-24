# KVC Hackathon Project

## Overview

This project is an AI-powered issue management system that helps process, analyze, and connect different types of technical documentation. It consists of three main components:

1. **Data Sources** - JSON files organized into categories:
   - Confluence pages (system documentation)
   - Feature requests
   - Normal tickets

2. **Backend API** - Express.js server with MongoDB integration:
   - Imports JSON data into MongoDB collections
   - Provides endpoints to retrieve and manipulate data
   - Connects related documentation through semantic understanding

3. **Conversion Tools** - Utilities to transform data formats:
   - JSON to Markdown conversion script
   - Data processing utilities

## Project Structure

```
├── convert_json_to_md.sh       # Script to convert JSON files to Markdown
├── README.md                   # This documentation file
├── backend/                    # Backend Express.js server
│   ├── app.js                  # Main Express application
│   ├── package.json            # Backend dependencies
│   ├── database/               # Database connection code
│   │   └── mongo_client.js     # MongoDB client configuration
│   └── repository/             # Data access layer
│       ├── feature_request_repository.js  # Feature request data operations
│       └── import_repository.js           # Data import operations
├── data-source/                # Source JSON data files
│   ├── confluence/             # Confluence documentation
│   ├── feature_request/        # Feature request tickets
│   └── normal_ticket/          # Regular issue tickets
└── data-source-md/             # Converted Markdown files
    ├── confluence/             # Converted Confluence documentation
    ├── feature_request/        # Converted feature request tickets
    └── normal_ticket/          # Converted regular issue tickets
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- zsh shell (for running conversion scripts)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd KVC-hackathon
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Configure MongoDB:
   - Make sure MongoDB is running on your system
   - Update connection settings in `backend/database/mongo_client.js` if needed

### Data Management

#### Converting JSON to Markdown

Run the conversion script to transform all JSON files to Markdown format:

```bash
./convert_json_to_md.sh
```

This will:
- Process all JSON files in `data-source/`
- Create corresponding folder structure in `data-source-md/`
- Generate Markdown files with proper naming conventions

#### Importing Data to MongoDB

The backend includes functionality to import all JSON data into MongoDB collections:

1. Start the backend server:
   ```bash
   cd backend
   node app.js
   ```

2. Trigger the import process by accessing the import endpoint.

## API Endpoints

- `GET /` - Health check endpoint
- `GET /feature_request` - Retrieves all feature requests
- Additional endpoints for data manipulation and analysis

## Data Formats

### Feature Request Format

```json
{
  "id": "fr-001",
  "title": "Feature Request Title",
  "description": "Detailed description of the feature request",
  "summary": "Brief summary",
  "status": "open|in-progress|done",
  "created_at": "ISO date string",
  "author": "Author Name"
}
```

### Normal Ticket Format

Similar to feature requests but may include additional fields like priority, assignee, etc.

### Confluence Document Format

Contains documentation information, usually with sections, content details, and metadata.

## Use Cases

- Analyzing connections between documentation and tickets
- Converting between documentation formats
- Building a knowledge graph of related technical information
- Supporting AI-assisted issue resolution

## License

[Your License Information]

## Contributors

[List of Contributors]

## API Documentation

### Feature Request Endpoints

#### Get All Feature Requests

Retrieves a list of all feature requests from the system.

```
GET /feature_request
```

**Example Request:**
```bash
curl --location 'http://localhost:2525/feature_request'
```


#### Get Feature Request by ID

Retrieves a specific feature request by its ID.

```
GET /feature_request/:id
```

**Example Request:**
```bash
curl --location 'http://localhost:2525/feature_request/fr-room-schedule-001'
```

#### Generate Analysis for Feature Request

Generates an AI analysis for a specific feature request, including related documentation and subtasks.

```
GET /feature_request/:id/generate
```

**Example Request:**
```bash
curl --location 'http://localhost:2525/feature_request/fr-room-schedule-001/generate'
```

### Additional Endpoints

- `GET /` - Health check endpoint that returns a simple message confirming the server is running
- `POST /import` - Triggers an import process to load JSON files into MongoDB collections