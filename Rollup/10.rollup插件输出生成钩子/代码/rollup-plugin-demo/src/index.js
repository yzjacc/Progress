import randomNumber from "./randomNumber";
import deepClone from "./deepClone";
// import logo from "./assets/react.png";
// console.log(logo);

// import vm from "virtual-module"
// console.log(vm(10))

// import pkg from "../package.json"
// console.log(pkg.name);

// document.getElementById("app").innerHTML = `
//   <div>
//     <img src="${logo}" alt="logo" />
//   </div>
// `

import("./sum.js").then(chunk => { 
  chunk.default(1, 2);
})

export default { randomNumber, deepClone }

