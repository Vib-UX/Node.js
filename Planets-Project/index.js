const { parse } = require('csv-parse')
const fs = require('fs');

const habitablePlanet = []

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] >0.36 && planet['koi_insol']<1.11
    && planet['koi_prad']<1.6;
}

// Its a good practice to stream large datasets
fs.createReadStream('kepler_data.csv')
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
    })
    .on('end', ()=>{
        console.log(habitablePlanet.map(planet =>{
            return planet['kepler_name']
        }))
        console.log(habitablePlanet.length);
        console.log('The file is ended!')
    })