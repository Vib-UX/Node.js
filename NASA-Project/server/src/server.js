const http = require('http');
const app = require('./app');


const PORT = process.env.PORT || 8000;

const  server =  http.createServer(app);
const {loadPlanetsData} = require('./models/planets.model');


async function loadServer(){
    await loadPlanetsData();
    server.listen(PORT, ()=>{
        console.log(`Server listening to PORT: ${PORT}...`)
    })
}

loadServer();

