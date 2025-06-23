const { MongoClient } = require("mongodb");

class MongoDBClient {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected successfully to MongoDB");
      this.db = this.client.db(this.dbName);
      return this.db;
    } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      throw err;
    }
  }

  async close() {
    try {
      await this.client.close();
      console.log("Disconnected successfully from MongoDB");
    } catch (err) {
      console.error("Failed to disconnect from MongoDB", err);
      throw err;
    }
  }
}

// Define a global variable for MongoDBClient
let mongoDBClient = new MongoDBClient(
  "mongodb://127.0.0.1:27017",
  "kvc_hackathon"
);

module.exports = mongoDBClient;
