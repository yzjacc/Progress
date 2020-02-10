import {b as y, c} from "./TestA.js";//不带花括号的引用，引入的都是default的，
// 引入的时候，必须指定引入某个数据
// console.log(y);
console.log(c);
setInterval(function () {
   console.log(c);
}, 1000);

export let k = 10;