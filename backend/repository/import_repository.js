const fs = require('fs').promises;
const path = require('path');
const mongoDBClient = require('../database/mongo_client');

class ImportRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.dataSourcePath = path.join(__dirname, '../../data-source');
    this.collections = ['confluence', 'feature_request', 'normal_ticket'];
  }

  async importAllCollections() {
    try {
      await this.mongoClient.connect();
      const db = this.mongoClient.db;
      const results = {};
      
      for (const collection of this.collections) {
        console.log(`Processing collection: ${collection}`);
        
        // Step 1: Clear existing collection
        await db.collection(collection).deleteMany({});
        console.log(`Cleared existing data from ${collection} collection`);
        
        // Step 2: Read all JSON files from the directory
        const collectionData = await this.readJsonFilesFromDirectory(path.join(this.dataSourcePath, collection));
        
        // Step 3: Import the data if there are any documents
        if (collectionData.length > 0) {
          const result = await db.collection(collection).insertMany(collectionData);
          console.log(`Imported ${result.insertedCount} documents into the ${collection} collection`);
          results[collection] = {
            success: true,
            count: result.insertedCount
          };
        } else {
          console.log(`No data to import for ${collection}`);
          results[collection] = {
            success: true,
            count: 0
          };
        }
      }
      
      console.log('All collections imported successfully');
      return { 
        success: true, 
        message: 'All collections imported successfully',
        details: results
      };
    } catch (error) {
      console.error('Error importing collections:', error);
      return { 
        success: false, 
        message: `Error importing collections: ${error.message}` 
      };
    }
  }

  async readJsonFilesFromDirectory(directoryPath) {
    try {
      const allData = [];
      const entries = await fs.readdir(directoryPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(directoryPath, entry.name);
        
        if (entry.isDirectory()) {
          // Recursively read files from subdirectories
          const subDirData = await this.readJsonFilesFromDirectory(fullPath);
          allData.push(...subDirData);
        } else if (entry.isFile() && path.extname(entry.name) === '.json') {
          // Read and parse JSON files
          const fileContent = await fs.readFile(fullPath, 'utf8');
          try {
            const jsonData = JSON.parse(fileContent);
            // Add source file metadata to the document
            jsonData._sourceFile = fullPath.replace(this.dataSourcePath, '');
            jsonData._importedAt = new Date();
            allData.push(jsonData);
          } catch (parseError) {
            console.error(`Error parsing JSON from ${fullPath}:`, parseError);
          }
        }
      }
      
      return allData;
    } catch (error) {
      console.error(`Error reading directory ${directoryPath}:`, error);
      return [];
    }
  }
}

module.exports = new ImportRepository(mongoDBClient);