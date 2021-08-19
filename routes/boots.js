var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");

var { v4: uuidv4 } = require('uuid');
var mime = require('mime-types');
var path = require('path');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
      uid = uuidv4();
      cb(null, uid + '.' + mime.extension(file.mimetype))
    }
});
   
var upload = multer({ storage: storage })

router.get('/', (req, res) => {
    Controllers.bootsController.getBoots(res);

    // get projects from database
    //getProjects(res)

})

router.post('/', upload.single('bootImg'), (req, res) => {
    console.log("Image processed...", req.file)
    Controllers.bootsController.addBoot(req.file, res)

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
    
    // Add to mongoDB
    // {img_uuid,s3_key, s3_url}

    // Add to S3
    
    /*console.log('New project posted')
    console.log('body', req.body)
    let project = req.body;
    res.send(req.body)*/
    //insertProject(project, res)
})


module.exports = router;