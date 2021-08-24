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

const insertBoot = async (req, res) => {
    // Insert data into mongDB


    
    if(req) {
        // Upload image to S3
        const result = await uploadFile(req);

        // If image uploaded to S3
        if(result) {
            // Add data to mongoDB
            let bootData = {
                imageID: result.Key,
                url: result.Location
            }
            bootsCollection.insertOne(bootData, (err, result) => {
                console.log('Boot Inserted to MongoDB', result)
                // res.send({ result: 200 })
            });

            res.json({
                statusCode: 200,
                url: bootData.url,
                message: "Success: Image uploaded to S3. Data inserted to mongoDB."
            }) 
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

module.exports = {
    getAllBoots, insertBoot
}