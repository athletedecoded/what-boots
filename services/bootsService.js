let client = require("../mongoConnect");
const { uploadFile, getFileStream } = require('../s3Connect')
let bootsCollection;
setTimeout(() => {
    bootsCollection = client.mongodbClient.db("sit725").collection("queryBoots");
}, 2000)

const getAllBoots = (res) => {
    bootsCollection.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
    })
}

const uploadBootImg = async (req, res) => {
    if(req) {
        // Upload image to S3
        const result = await uploadFile(req);
        console.log('Boot uploaded to S3', result)
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
            message: "Failed: No request body"
        })
    };
}

const insertBootData = (req, res) => {
    // Add data to mongoDB
    let bootData = {
        imageID: req.imgID,
        url: req.url
    }
    
    bootsCollection.insertOne(bootData, (err, result) => {
        if(result) {
            console.log('Boot Inserted to MongoDB', result)
            res.json({
                statusCode: 200,
                url: result.Location,
                message: "Success: Image uploaded to S3. Data inserted to mongoDB."
            }) 
        }
    });

    
}

module.exports = {
    getAllBoots, uploadBootImg, insertBootData
}