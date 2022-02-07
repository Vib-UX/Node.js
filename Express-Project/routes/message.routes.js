const express = require('express');

const messageController = require('../controllers/message.controller')
const messageRouter = express.Router()

// Post request
messageRouter.post('/',messageController.postMessage);
messageRouter.get('/',messageController.getMessage)
messageRouter.get('/photo',messageController.sendPhoto);


module.exports = messageRouter;