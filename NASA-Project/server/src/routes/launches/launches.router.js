const express = require('express');
const {httpGetAllLaunches, httpAddNewLaunch} =require('./launches.controller');

const launchRouter = express.Router();

launchRouter.get('/', httpGetAllLaunches);
launchRouter.post('/', httpAddNewLaunch);


module.exports = launchRouter;