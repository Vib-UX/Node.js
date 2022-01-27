// Object Spread Operator (ES9)
const animals = {
    tiger: 23,
    lion: 5,
    monkey: 2
}

const {tiger,lion, ...rest} =animals


function objectSpread(p1,p2,p3){
    console.log(p1)
    console.log(p2)
    console.log(p3)
}

objectSpread(tiger,lion,rest)

// Similar to arrays
const array = [1,2,3,4,5]

function sum (a,b,c,d,e){
    return a+b+c+d+e;
}

console.log(sum(...array));

// Finally in new JS

const urls = [
    'https://swapi.co/api/people/1',
    'https://swapi.co/api/people/2',
    'https://swapi.co/api/people/3',
    'https://swapi.co/api/people/4'
]

Promise.all(urls.map(url =>{
    return fetch(url).then(resp => resp.json())
})).then(result => {
    console.log(result[0])
    console.log(result[1])
    console.log(result[2])
    console.log(result[3])
}).catch(err =>{ console.log(err)})
.finally(()=> console.log("This is going to be executed no matter what!"))

// for await of
const getData2 = async function(){
    const arrayOfPromises = urls.map(url=> fetch(url));
    for await (let request of arrayOfPromises){
        const data = await request.json();
        console.log(data)
    }
}

