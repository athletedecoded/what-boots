let client = require("../mongoConnect");
const { uploadFile, getFileStream } = require('../s3Connect')
let bootsCollection;
setTimeout(() => {
    bootsCollection = client.mongodbClient.db("sit725").collection("allBoots");
}, 2000)

const getAllBoots = (res) => {
    bootsCollection.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
    })
}

const insertBoot = async (req, res) => {
    // Insert data into mongDB
    // bootsCollection.insertOne(boot, (err, result) => {
    //     console.log('Boot Inserted', result)
    //     res.send({ result: 200 })
    // })


    // Upload image to S3
    if(req) {
        const result = await uploadFile(req);
        console.log(result);
        res.json({
            statusCode: 200,
            url: result,
            message: "Success: Image uploaded to S3"
        }) 
    }

    else {
        res.json({
            statusCode: 400,
            data: req,
            message: "Failed to upload to S3"
        })
    };
}

// app.post('/api/boots', upload.single('bootImg'), async (req, res) => {
//     console.log(req.file)
//     if(req.file) {
//         const result = await uploadFile(req.file);
//         console.log(result);
//         res.json({
//             statusCode: 200,
//             url: result,
//             message: "Success: Image uploaded to S3"
//         }) 
//     }

//     else {
//         res.json({
//             statusCode: 400,
//             data: req.file,
//             message: "Failed to upload"
//         })
//     };
// });

module.exports = {
    getAllBoots, insertBoot
}