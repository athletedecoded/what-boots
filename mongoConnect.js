require('dotenv').config();

// MongoDB Config
const mongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const mongodbClient = new mongoClient(uri,{ useNewUrlParser : true });
let bootsCollection;

// const createCollection = (collectionName) => {
//   mongodbClient.connect((err,db) => {
//     bootsCollection = mongodbClient.db().collection(collectionName);
//     if (!err) {
//       console.log("MongoDB Connected...");
//     }
//     else {
//       console.log("DB error", err);
//       process.exit(1);
//     }
//   })
// }

mongodbClient.connect((err,db) => {
  if (!err) {
    console.log("MongoDB Connected...");
  }
  else {
    console.log("DB error", err);
    process.exit(1);
  }
});

const insertBoot = (boot, callback) => {
  	bootsCollection.insert(boot, callback);
}

const getAllBoots = (callback) => {
  	bootsCollection.find({}).toArray(callback);
}


exports.mongodbClient = mongodbClient;