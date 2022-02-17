const {getAllLaunches} = require('../../models/launches.model');

function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches()); //launches.values() gives an iterable
}

module.exports={
    httpGetAllLaunches,
}