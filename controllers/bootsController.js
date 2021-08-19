let Service = require("../services");

const getBoots = (res) => {
    console.log('controller ')
    Service.bootService.getBoots(res)
}

const addBoot = (data, res) => {
    Service.bootService.insertBoot(data,res)
}

module.exports = {
    getBoots, addBoot
}