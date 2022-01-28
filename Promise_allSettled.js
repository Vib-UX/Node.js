

const promiseOne = new Promise((resolve, reject) =>{
    setTimeout(resolve,6000)
})

const promiseTwo = new Promise((resolve,reject) =>{
    setTimeout(reject,3000);
})


// Old way
Promise.all([promiseOne, promiseTwo]).then(console.log).catch(e => console.log(`something failed ${e}`))

// New Way
Promise.allSettled([promiseOne, promiseTwo]).then(console.log)