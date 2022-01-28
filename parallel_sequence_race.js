const promisify = (item,delay) =>
    new Promise((resolve) =>
        setTimeout(() =>
            resolve(item),delay))


const a = () => promisify('a',100);
const b = () => promisify('b',500);
const c = () => promisify('c',3000);

async function parallel(){
    const promises = [a(), b(), c()];
    const [output1, output2, output3 ] = await Promise.all(promises);
    return `parallel is done ${output1} ${output2} ${output3}`;
}

parallel().then(console.log)

async function race(){
    const promises = [a(),b(),c()]
    const output1 = await Promise.race(promises);
    return `race is done ${output1}`;
}

race().then(console.log);

async function sequential(){
    const output1 = await a();
    const output2 = await b();
    const output3 = await c();
    return `sequential is done ${output1} ${output2} ${output3}`;
}

sequential().then(console.log)