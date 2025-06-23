const mongoDBClient = require('../database/mongo_client');

class FeatureRequestRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.collectionName = 'feature_request';
  }

  async getFeatureRequests() {
    try {
      await this.mongoClient.connect();
      const db = this.mongoClient.db;
      
      // Fetch all feature requests from the collection
      const featureRequests = await db.collection(this.collectionName).find({}).toArray();
      
      console.log(`Retrieved ${featureRequests.length} feature requests`);
      return {
        success: true,
        data: featureRequests,
        count: featureRequests.length
      };
    } catch (error) {
      console.error('Error getting feature requests:', error);
      return {
        success: false,
        message: `Error getting feature requests: ${error.message}`,
        error: error.toString()
      };
    }
  }

  async getFeatureRequestById(id) {
    try {
      await this.mongoClient.connect();
      const db = this.mongoClient.db;
      
      // Fetch feature request by ID
      const featureRequest = await db.collection(this.collectionName).findOne({ id });
      
      if (!featureRequest) {
        return {
          success: false,
          message: `Feature request with id ${id} not found`,
          status: 404
        };
      }
      
      console.log(`Retrieved feature request with id ${id}`);
      return {
        success: true,
        data: featureRequest
      };
    } catch (error) {
      console.error(`Error getting feature request with id ${id}:`, error);
      return {
        success: false,
        message: `Error getting feature request: ${error.message}`,
        error: error.toString(),
        status: 500
      };
    }
  }
}

module.exports = new FeatureRequestRepository(mongoDBClient);
