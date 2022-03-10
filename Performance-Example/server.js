const express = require('express')

const app = express()

function delay(duration){
    const startTime = Date.now()
    while(Date.now()-startTime<duration){
        // eventloop is completely blocked
    }
}

app.get('/', (req,res)=>{
    res.send("Performance Example");
})

app.get('/timer', (req,res)=>{
    delay(9000)
    res.send('ding ding ding!')
})

app.listen(3000)