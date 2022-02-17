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

launches.set(launch.flightNumber,launch);
function getAllLaunches(){
    return Array.from(launches.values());
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

module.exports={
    getAllLaunches,
    addNewLaunch
}