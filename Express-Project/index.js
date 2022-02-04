const express = require('express')

const app = express();
const PORT = 3000;

const friends = [
    {
        id:0,
        name: 'Web Browser'
    },
    {
        id:1,
        name: 'User'   
    },
    {
        id:2,
        name: 'Postman'
    }
];

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
app.post('/friends', (req,res)=>{
    if(!req.body.name){
        return res.status(400).json({
            error: "Invalid Post request"
        })
    }
    const newFriend ={
        name: req.body.name,
        id: friends.length
    }
    friends.push(newFriend);
    res.json(newFriend)
})

// app.get('/',(req,res)=>{
//     res.send({
//         id:0,
//         name: 'Web Browser'
//     });
// })

app.get('/friends',(req,res)=>{
    res.json(friends)
})

// Parameterized route
app.get('/friends/:friendsID', (req,res)=>{
    const friendId = +req.params.friendsID;     // here '+' implicitly converts it into a Number
    const friendShare = friends[friendId];
    if(friendShare){
        res.json(friendShare);
    } else {
        res.status('404').json({
            error: "Friend does not exist"
        })
    }
})

app.get('/messages', (req,res)=>{
    res.send("<ul><li>Helloo Web</li></ul>");
})

app.post('/messages', (req,res)=>{
    console.log('Updating messages...')
})

app.listen(PORT,()=>{
    console.log(`Listening on PORT.... ${PORT}`)
})