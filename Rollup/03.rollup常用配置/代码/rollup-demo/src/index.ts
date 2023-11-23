import { getRandomNum,deepClone } from './util';
const r = getRandomNum(1, 10);
console.log(r);

const obj = { a: 1, b: { c: 3 } };
const obj2 = deepClone(obj);
obj2.b.c = 4;

console.log(obj);
console.log(obj2);