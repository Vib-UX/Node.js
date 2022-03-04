const {getAllLaunches, addNewLaunch, existsLaunchId, abortLaunchById} = require('../../models/launches.model');

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

function httpAbortLaunch(req, res){
    const launchId = +req.params.id;
    // if launch doesn't exist
    if(!existsLaunchId(launchId)){
        return res.status(404).json({
            error: 'Launch not found',
        })
    }

    // if launch exist
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}