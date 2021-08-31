// let client = require("../mongoConnect");
// let bootsCollection;
// setTimeout(() => {
//     bootsCollection = client.mongodbClient.db("sit725").collection("queryBoots");
// }, 2000)
const path = require('path');

const { imageClassification } = require('../model.js')

const getPreds = async (imgID, res) => {
    if(imgID) {
        let imgPath = path.join(__dirname,'../public/uploads',imgID)
        // Send req (image path) to TF model endpoint
        const preds = await imageClassification(imgPath);
        console.log("Predictions", preds)
        // Response object should be labels and probabilities
        // Call insert prediction
        // projectsCollection.find().toArray(function (err, result) {
        // if (err) throw err;
        // res.send(result)
        // })
    }
}


module.exports = {
    getPreds
}