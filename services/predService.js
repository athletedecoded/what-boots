let client = require("../mongoConnect");
let bootsCollection;
setTimeout(() => {
    bootsCollection = client.mongodbClient.db("sit725").collection("queryBoots");
}, 2000)

// const getPrediction = async (req, res) => {
//     if(req) {
//         // Send req (image url) to TF model endpoint
//         // const result = await tfModel(req);

//         // Response object should be labels and probabilities
//         // Call insert prediction
//         projectsCollection.find().toArray(function (err, result) {
//         if (err) throw err;
//         res.send(result)
//     })
// }


// module.exports = {
//     getAllProjects, insertProject
// }