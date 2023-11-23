import randomNumber from "./randomNumber";
import deepClone from "./deepClone";
import vm from "virtual-module"
console.log(vm(10))

import pkg from "../package.json"
console.log(pkg.name);

export default { randomNumber, deepClone }

