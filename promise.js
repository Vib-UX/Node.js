const fetch = require('node-fetch');
/* 
    When you dont want the JS to block the execution of your code, like
    making API calls, grabbing data from a database, or maybe optimimzing an 
    image, you use a promise so that task happens in the background.

    When the promise gets resolved or rejected you will get that response
*/

// A real world useCase

const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums",
]

Promise.all(urls.map(url =>{
    return fetch(url).then(resp=> resp.json())
})).then(results =>{
    console.log(results[0])
    console.log(results[1])
    console.log(results[2])
})