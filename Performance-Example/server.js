const express = require('express')
const cluster = require('cluster')
const os = require('os')

const app = express()

function delay(duration){
    const startTime = Date.now()
    while(Date.now()-startTime<duration){
        // eventloop is completely blocked
    }
}

// Real blockers of event-loop in Node.js
/*
    JSON.stringify({})=>"{}"
    JSON.parse("{}") =>{}
    array.sort()
*/

app.get('/', (req,res)=>{
    res.send(`Performance Example: ${process.pid}`)  // process.pid will let us know which process is handling the incoming request
})

app.get('/timer', (req,res)=>{
    delay(9000)
    res.send(`ding ding ding! ${process.pid}`)
})

if (cluster.isMaster){
    console.log('Master has been started...')
    // Maximize the performance based on the CPU core
    for(let i=0;i<os.cpus().length;i++){
        cluster.fork();
    }
    
} else{
    console.log('Worker process started.')
    app.listen(3000)
}
