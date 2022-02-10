const express = require('express');
const planetsRouter = require('./routes/palnets/planets.router')


const app = express();

// Middleware
app.use(express.json());

module.exports= app;