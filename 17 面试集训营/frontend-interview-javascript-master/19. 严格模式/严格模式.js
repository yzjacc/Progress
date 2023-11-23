"use strict"

// 1. 没有声明的变量不能使用
// a = 10;
// console.log(a);

// 2. 删除变量和不存在的属性会报错

// var i = 10;
// delete i;

// delete Object.prototype;

// 3. 函数中相同的形参名会报错

// function test(a, a){

// }

// 4. 对象不能有重名的属性(根据 MDN 的说法ES6已经不存在此问题，有一个 bug 的提案)

// var o = {
//     p: 1,
//     p: 2
// };
// console.log(o.p);

// 5. 八进制
// 以前可以使用 0作为八进制的前缀
// var i = 010;
// console.log(i);


// 6. 函数中的 this 为 undefined
// function test(){
//     console.log(this);
// }
// test();

// 7. eval 作用域

// var x = 2;
// console.info(eval("var x = 5; x")); // 5
// console.info(x); // 2

// 8. 不能使用保留字作为标识符

var public = "hello world";
console.log(public);