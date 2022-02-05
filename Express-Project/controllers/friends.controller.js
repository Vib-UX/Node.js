const friends = require('../models/friends.model');

function postFriend(req,res){
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
}

function getFriends(req,res){
    res.json(friends)
}

function getFriend(req,res){
    const friendId = +req.params.friendsID;     // here '+' implicitly converts it into a Number
    const friendShare = friends[friendId];
    if(friendShare){
        res.json(friendShare);
    } else {
        res.status('404').json({
            error: "Friend does not exist"
        })
    }
}

module.exports={
    getFriend,getFriends,postFriend
}