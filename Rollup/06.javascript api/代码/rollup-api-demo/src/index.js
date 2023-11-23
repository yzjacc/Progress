import randomNumber from "./randomNumber";
import deepClone from "./deepClone";

import("./sum.js").then(chunk => { 
  console.log(chunk.default(1, 2));
})

export default { randomNumber, deepClone }

