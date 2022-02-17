const express = require('express');
const {httpGetAllLaunches} =require('./launches.controller');

const launchRouter = express.Router();

launchRouter.get('/launches', httpGetAllLaunches);


module.exports = launchRouter;