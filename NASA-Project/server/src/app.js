const express = require('express');
const planetsRouter = require('./routes/palnets/planets.router')
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

// Middleware
app.use(express.json());

// Static server listen
app.use(express.static(path.join(__dirname,'..','public_1')));

app.use(planetsRouter);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public_1','index.html'));
})

module.exports= app;