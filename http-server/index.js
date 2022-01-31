const http = require('http')

const PORT = 3000;

const server = http.createServer((req,res) =>{

    /*
        request here is received from client side and response is
        what we are going to send back from the server.
        
        request is areadable stream and response is a writable stream
    */

    res.writeHead(200,{
        'Content-Type': 'text/plain',
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
        id:1 ,
        name: 'Adam',
    }));
})

server.listen(PORT,()=>{
    console.log(`listening on ${3000}`)
});