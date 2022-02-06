const express = require('express')

const friendsRouter = require('./routes/friends.routes')
const messageRouter = require('./routes/message.routes')

const app = express();
const PORT = 3000;

// Middleware
app.use((req,res,next)=>{
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method}  + ${req.baseUrl} ${req.url} ${delta}ms`);
})

// JSON Parsing middleware
app.use(express.json());

app.use('/friends', friendsRouter);
app.use('/message', messageRouter);

app.listen(PORT,()=>{
    console.log(`Listening on PORT.... ${PORT}`)
})