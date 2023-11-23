// import { randomNumber } from "./util.js";

// const r = randomNumber(1, 10);
// console.log(r);

function run() { 
  import("./util.js").then(chunk => { 
    const r = chunk.default.randomNumber(1, 10)
    console.log(r);
  })
}

run();
