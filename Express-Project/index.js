const express = require('express')
const messageController = require('./controllers/message.controller');
const friendController = require('./controllers/friends.controller');

const app = express();
const PORT = 3000;

// Middleware
app.use((req,res,next)=>{
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method}  + ${req.url} ${delta}ms`);
})

// JSON Parsing middleware
app.use(express.json());

// Post request
app.post('/friends',friendController.postFriend);
app.get('/friends',friendController.getFriends)
// Parameterized route
app.get('/friends/:friendsID', friendController.getFriend)

app.get('/messages', messageController.getMessage);
app.post('/messages',messageController.postMessage);

app.listen(PORT,()=>{
    console.log(`Listening on PORT.... ${PORT}`)
})