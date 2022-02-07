const path = require('path');

function sendPhoto(req,res){
    res.sendFile(path.join(__dirname, '..','public', 'chess.png'));
}

function getMessage(req,res){
    res.send("<ul><li>Helloo Web</li></ul>");
}

function postMessage(req,res){
    console.log('Updating messages...')
}

module.exports={
    getMessage,postMessage,sendPhoto

}

