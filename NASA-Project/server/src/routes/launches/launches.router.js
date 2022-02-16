const express = require('express');
const {getAllLaunches} =require('./launches.controller');

const launchRouter = express.Router();

launchRouter.get('/launches', getAllLaunches);


module.exports = launchRouter;