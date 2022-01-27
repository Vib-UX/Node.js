/*
    Underneath the hood its just handling the promises but in more representable way
*/

// Eg.
movePlayer(100, 'Left')
    .then(() => movePlayer(400,'Left'))
    .then(() => movePlayer(10,'Right'))
    .then(()=> movePlayer(330,'Left'))

async function playerStart(){
    await movePlayer(100, 'Left');
    await movePlayer(400, 'Left');
    await movePlayer(10, `Right`);
    await movePlayer(330, 'Left')
}

// Eg. with fetch() api 
fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(console.log)

async function catchData() {
    const data  = await fetch('https://jsonplaceholder.typicode.com/users');
    const view = await data.json()
    console.log(view);
}

catchData()

// Eg. for real world UseCase
const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums",
]

Promise.all(urls.map(url => {
    fetch(url).then(resp => resp.json())
})).then((results)=>{
    console.log(results[0])
    console.log(results[1])
    console.log(results[2])
})

const getData = async function(){
    try{
        const [users, posts, albums] = await Promise.all(urls.map(url =>{
            const response = await fetch(url);
            return response.json();

        }))
        console.log(users);
        console.log(posts);
        console.log(albums);
    }
    catch(err){
        console.log(`${err}`)
    }
}

getData()