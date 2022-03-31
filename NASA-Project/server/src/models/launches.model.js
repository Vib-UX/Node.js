const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const launches = new Map();

const DEFAULT_LAUNCH_FLIGHT =100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27,2030'),
    target: 'Kepler-442 b',
    customers: ['ISRO','NASA'],
    upcoming: true,
    success: true,
};


saveLaunch(launch)

function existsLaunchId(launchId){
    return launches.has(launchId);
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
    if (!latestLaunch){
        return DEFAULT_LAUNCH_FLIGHT
    }

    return latestLaunch.flightNumber
}

async function getAllLaunches(){
    return await launchesDatabase.find({},{
        '_id':0, '__v':0
    })
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target
    })
    if (!planet){
        throw new Error('No matching planet found')
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    },launch,{
        upsert: true
    })
}

async function scheduleNewLaunch(launch){
    const newFlighNumber = await getLatestFlightNumber()+1
    const newLaunch = Object.assign(launch,{
        success: true,
        upcoming: true,
        customers: ['ISRO','NASA'],
        flightNumber: newFlighNumber,
    })

    await saveLaunch(newLaunch)
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming=false;
    aborted.success=false;
    return aborted;
}

module.exports={
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchId,
    abortLaunchById
}