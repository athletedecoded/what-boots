const path = require('path');
const { imageClassification } = require('../model.js');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const getPreds = async (imgID, res) => {
    if(imgID) {
        let imgPath = path.join(__dirname,'../public/uploads',imgID);
        
        // Send req (image path) to TF model endpoint
        const preds = imageClassification(imgPath);
        // Tidy uploads, remove image from temp server storage  
        await unlinkFile(imgPath);

        return preds;
    }
}


module.exports = {
    getPreds
}