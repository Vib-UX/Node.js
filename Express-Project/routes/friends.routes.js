const express = require('express');

const friendController = require('../controllers/friends.controller')
const friendsRouter = express.Router()

// Middleware inside the router
friendsRouter.use((req,res,next)=>{
    console.log('ip address calling' + req.ip);
    next()
})

// Post request
friendsRouter.post('/',friendController.postFriend);
friendsRouter.get('/',friendController.getFriends)
// Parameterized route
friendsRouter.get('/:friendsID', friendController.getFriend)

module.exports = friendsRouter;