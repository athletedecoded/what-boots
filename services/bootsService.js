let client = require("../mongoConnect");
const { uploadFile, getFileStream } = require('../s3Connect')

let bootsCollection;
setTimeout(() => {
    bootsCollection = client.mongodbClient.db("sit725").collection("queryBoots");
}, 2000)

const getAllBoots = (res) => {
    bootsCollection.find().toArray(function (err, result) {
        if (result) {
            res.json({
                statusCode: 200,
                data: result,
                message: "Success: Retrieved all boots"
            })
        }
    })
}

const uploadBootImg = async (req, res) => {
    if(req) {
        // Upload image to S3
        const result = await uploadFile(req);
        console.log('Boot uploaded to S3')
        // If image uploaded to S3
        if(result) {
             return result
        }
        else {
            res.json({
                statusCode: 400,
                data: req,
                message: "Failed: Image failed to upload to S3"
            })
        };
    }
    else {
        res.json({
            statusCode: 400,
            data: req,
            message: "Failed: No image to upload"
        })
    };
}

const insertBootData = (req, res) => {
    // Add data to mongoDB
    let bootData = {
        imageID: req.imgID,
        url: req.url,
        preds: req.preds
    }
    
    bootsCollection.insertOne(bootData, (err, result) => {
        if(result) {
            console.log('Boot data added to MongoDB', result)
            res.json({
                statusCode: 200,
                preds: bootData.preds,
                imgURL: bootData.url,
                message: "Success: Image uploaded to S3. Data inserted to mongoDB."
            }) 
        }
    });
}

module.exports = {
    getAllBoots, uploadBootImg, insertBootData
}