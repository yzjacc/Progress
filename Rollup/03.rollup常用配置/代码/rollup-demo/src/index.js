import {randomNumber,deepClone} from "./util.js";

// import { chunk } from "lodash-es";
// const r = chunk([1, 2, 3, 4, 5, 6, 7], 2);
// console.log("🚀 ~ r:", r)


const r = randomNumber(1, 10);
console.log(r);

const obj1 = {
  a: 1,
  b: {
    c:3
  }
}
const obj2 = deepClone(obj1);
obj2.b.c = 4;
console.log(obj1)
console.log(obj2)

const arr = [1, 2, 3, 4].map(item => item * item);
console.log(arr);

Promise.resolve(1).then(res => console.log(res));