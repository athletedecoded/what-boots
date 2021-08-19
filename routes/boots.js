var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");


router.get('/', (req, res) => {
    Controllers.bootController.getBoots(res);

    // get projects from database
    //getProjects(res)

})

router.post('/', (req, res) => {
    Controllers.bootsController.addBoot(req.body, res)

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