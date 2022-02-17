const {getAllLaunches, addNewLaunch} = require('../../models/launches.model');

function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches()); //launches.values() gives an iterable
}

function httpAddNewLaunch(req,res){
    const launch = req.body;
    if(!launch.launchDate || !launch.mission || !launch.target || !launch.rocket){
        return res.status(400).json({
            error: "Missing launch field"
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: "Invalid date format"
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
}