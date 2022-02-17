const { parse } = require('csv-parse')
const fs = require('fs');
const path = require('path');

const habitablePlanet = []

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] >0.36 && planet['koi_insol']<1.11
    && planet['koi_prad']<1.6;
}

function loadPlanetsData(){
    // Its a good practice to stream large datasets
    return new Promise((resolve,reject) =>{
        fs.createReadStream(path.join(__dirname,'..','..','data', 'kepler_data.csv'))
        /*
            Pipe function is meant to connect a readable stream source to readable 
            stream destination.

            In our case process the data in readable format using parse 
        */
        .pipe(parse({
            comment: '#',
            columns: true,
        })) 
        .on('data', (data)=>{
            if(isHabitablePlanet(data)){
                habitablePlanet.push(data)
            }
        })
        .on('error', (err)=>{
            console.log(err)
            reject(err)
        })
        .on('end', ()=>{
            
            console.log(habitablePlanet.length);
            console.log('The file is ended!')
            resolve();
        })
    })
}

// loadPlanetsData();
function getAllPlanets(){
    return habitablePlanet;
}

module.exports={
    loadPlanetsData,
    getAllPlanets,
}