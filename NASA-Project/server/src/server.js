const http = require('http');
const app = require('./app');
require('dotenv').config({path: "../.env"});
const mongoose = require('mongoose')


const PORT = process.env.PORT || 8000;
// const MONGO_URL = `${process.env.MONGO_URL}`;
const MONGO_URL = "mongodb+srv://nasa-api:ymfjFXOjndL7rrpU@cluster0.oipat.mongodb.net/?retryWrites=true&w=majority"

const  server =  http.createServer(app);
const {loadPlanetsData} = require('./models/planets.model');
const {loadLaunchesData} = require('./models/launches.model');

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection ready!')
})
mongoose.connection.on('error',(err)=>{
    console.error(err)
})

async function loadServer(){
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData();
    await loadLaunchesData();
    server.listen(PORT, ()=>{
        console.log(`Server listening to PORT: ${PORT}...`)
    })
}

loadServer();

