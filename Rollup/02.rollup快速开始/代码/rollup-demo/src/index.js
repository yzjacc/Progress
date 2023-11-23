import { randomNumber } from "./util.js";

const r = randomNumber(1, 10);
console.log(r);

// const obj1 = {
//   a: 1,
//   b: {
//     c:3
//   }
// }
// const obj2 = deepClone(obj1);
// obj2.b.c = 4;
// console.log(obj1)
// console.log(obj2)