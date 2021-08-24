let Service = require("../services");

const getAllBoots = (res) => {
    Service.bootsService.getAllBoots(res)
}

const addBoot = (data, res) => {
    Service.bootsService.insertBoot(data,res)
}

module.exports = {
    getAllBoots, addBoot
}