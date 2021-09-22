let Service = require("../services");

const getAllBoots = (res) => {
    Service.bootsService.getAllBoots(res);
}

const classifyBoot = async (imgData, res) => {
    // Upload boot image to S3
    const imgResult = await Service.bootsService.uploadBootImg(imgData,res);
    
    // Call TF model using server img path
    const predResult = await Service.predService.getPreds(imgResult.key);

    // Upload data to mongoDB
    const bootData = {
        url: imgResult.Location,
        imgID: imgResult.key,
        preds: predResult
    };

    Service.bootsService.insertBootData(bootData,res);
};

module.exports = {
    getAllBoots, classifyBoot
};