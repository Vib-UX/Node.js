const express = require('express');

const messageController = require('../controllers/message.controller')
const messageRouter = express.Router()

// Post request
messageRouter.post('/',messageController.postMessage);
messageRouter.get('/',messageController.getMessage)


module.exports = messageRouter;