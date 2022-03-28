const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const launches = new Map();

let latestFlightNumber = 100;
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
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    },launch,{
        upsert: true
    })
}

function addNewLaunch(launch){
    // latestFlightNumber+=1;
    launches.set(++latestFlightNumber,Object.assign(launch,{      // Object.assign to add new prop to an object
        flightNumber: latestFlightNumber,
        success: true,
        upcoming: true,
        customers: ['ISRO','NASA'],
    }))
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming=false;
    aborted.success=false;
    return aborted;
}

module.exports={
    getAllLaunches,
    addNewLaunch,
    existsLaunchId,
    abortLaunchById
}