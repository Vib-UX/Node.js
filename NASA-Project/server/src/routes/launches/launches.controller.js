const {launches} = require('../../models/launches.model');

function getAllLaunches(req,res){
    return res.status(200).json(Array.from(launches.values())); //launches.values() gives an iterable
}

module.exports={
    getAllLaunches,
}