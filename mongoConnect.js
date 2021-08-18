require('dotenv').config();

// MongoDB Config
const mongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const mongodbClient = new mongoClient(uri,{ useNewUrlParser : true });
let projectCollection;

const createCollection = (collectionName) => {
  mongodbClient.connect((err,db) => {
    projectCollection = mongodbClient.db().collection(collectionName);
    if (!err) {
      console.log("MongoDB Connected...");
    }
    else {
      console.log("DB error", err);
      process.exit(1);
    }
  })
}

const insertBoot = (boot, callback) => {
  	projectCollection.insert(boot, callback);
}

const getBoots = (callback) => {
  	projectCollection.find({}).toArray(callback);
}


exports.mongodbClient = mongodbClient;