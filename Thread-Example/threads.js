// Worker thread act as multiple threads working in the same process

const { isMainThread, Worker, workerData } = require("worker_threads");

if (isMainThread) {
console.log(`Main Thread! Process ID: ${process.pid}`)
  new Worker(__filename,{
      workerData: [7,6,2,3]
  });
  new Worker(__filename, {
      workerData: [1,3,4,2]
  });
} else {
  console.log(`Worker! Process ID: ${process.pid}`);
  console.log(`${workerData} sorted is ${workerData.sort()}`)
}
