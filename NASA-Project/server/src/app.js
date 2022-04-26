const express = require('express');
const planetsRouter = require('./routes/palnets/planets.router')
const launchesRouter = require('./routes/launches/launches.router');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan('combined'));       // morgan used to log-output

// Middleware
app.use(express.json());

// Static server listen
app.use(express.static(path.join(__dirname,'..','public_1')));

app.use('/planets',planetsRouter);
app.use('/launches',launchesRouter);
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public_1','index.html'));
})

module.exports= app;