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
        const preds = imageClassification(imgPath);
        return preds
    }
}




module.exports = {
    getPreds
}