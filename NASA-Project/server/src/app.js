const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const app = express();

const api = require('./routes/api');

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan('combined'));       // morgan used to log-output

// Middleware
app.use(express.json());

// Static server listen
app.use(express.static(path.join(__dirname,'..','public_1')));

// App using Version-1 api
app.use('/v1',api);

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public_1','index.html'));
})

module.exports= app;