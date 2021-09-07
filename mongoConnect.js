require('dotenv').config();

// MongoDB Config
const mongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const mongodbClient = new mongoClient(uri,{ useNewUrlParser : true });
let bootsCollection;

mongodbClient.connect((err,db) => {
  if (!err) {
    console.log("MongoDB Connected...");
  }
  else {
    console.log("DB error", err);
    process.exit(1);
  }
});

// const insertBoot = (boot, callback) => {
//   	bootsCollection.insert(boot, callback);
// }

// const getAllBoots = (callback) => {
//   	bootsCollection.find({}).toArray(callback);
// }


exports.mongodbClient = mongodbClient;