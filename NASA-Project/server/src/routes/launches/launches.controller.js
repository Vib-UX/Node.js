const {getAllLaunches, existsLaunchId, abortLaunchById, scheduleNewLaunch} = require('../../models/launches.model');

async function httpGetAllLaunches(req,res){
    return res.status(200).json(await getAllLaunches()); //launches.values() gives an iterable
}

async function httpAddNewLaunch(req,res){
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
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res){
    const launchId = +req.params.id;
    // if launch doesn't exist
    const existLaunch = await existsLaunchId(launchId)
    if(!existLaunch){
        return res.status(404).json({
            error: 'Launch not found',
        })
    }

    // if launch exist
    const aborted = await abortLaunchById(launchId);
    if (!aborted){
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }
    return res.status(200).json({ok: true});
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}