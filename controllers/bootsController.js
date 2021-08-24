let Service = require("../services");

const getAllBoots = (res) => {
    Service.bootsService.getAllBoots(res)
}

const classifyBoot = async (imgData, res) => {
    // Upload boot image to S3
    const result = await Service.bootsService.uploadBootImg(imgData,res)
    const bootData = {
        url: result.Location,
        imgID: result.key
    }
    
    // Call TF model using returned URL
    // Service.predService.getPreds(bootData.url)

    // Upload data to mongoDB
    Service.bootsService.insertBootData(bootData,res)
}

module.exports = {
    getAllBoots, classifyBoot
}