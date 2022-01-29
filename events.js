// Impotant Topic
const EventEmitter = require("events");

const celebrity = new EventEmitter()

// Observer 1 ---> Fan
celebrity.on("race", (result)=>{
    (result === "win") ? console.log("Congratulation, well done") : console.log("No worries we will get it Next Time!")
})


// Observer 2 ---> Nemesis
celebrity.on("race", (result)=>{
    result === "win" ? console.log("I could have done it better!") : console.log("I was right to not bet on you.") 
})


// Process Global object which also generated from events
process.on("exit", (code)=>{
    console.log(`Execution ${code} has been finished `)
})

// Emit the celebrity event
celebrity.emit("race", "win")

