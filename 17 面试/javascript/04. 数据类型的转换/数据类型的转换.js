// 1. js 是动态语言，变量可以是任意类型
// var i = 1;
// i = "xiejie";
// console.log(i);

// 2. 在 js 中存在数据类型的转换
// var result = '4' - '3';
// console.log(result, typeof result);


// 3. 强制转换

// 3-1 Number() 可以将任意类型的值都转为 number 类型
// （1）简单值
// console.log(Number('')); // 0
// console.log(Number('123')); // 123
// console.log(Number('xiejie')); // NaN
// console.log(Number('123?')); // NaN
// // Number() 和 parseInt 就不一样
// // parseInt 是会尽可能的去多转换
// console.log('parseInt:::',parseInt('123xiejie')); // NaN
// console.log('parseInt:::',parseInt('xiejie123')); // NaN
// console.log(Number(true)); // 1
// console.log(Number(false)); // 0

// console.log(Number(undefined)); // NaN
// console.log(Number(null)); // 0
// console.log("parseInt::",parseInt(undefined)); // NaN
// console.log("parseInt::",parseInt(null)); // NaN

// (2) 对象的情况
// 第一步 valueOf 能得到简单值，调用 Number()，如果是对象，进入第二步
// 第二步 toString 能得到简单值，调用 Number()，如果仍然是对象，进入第三步
// 第三步 如果还是对象，就报错

// valueOf 和 toString 方法是任何对象或者值都有的，因为这两个方法是挂在 Object.prototype 上面的
// var obj= {
//     name : 'xiejie'
// };
// console.log(obj.valueOf());
// console.log(obj.toString());

// console.log(Number(obj));

// 1. valueOf ----> { name: 'xiejie' }
// 2. toString ----> [object Object] ----> Number('[object Object]')
// 3. 最终得到 NaN

// var arr = [1,2,3];
// console.log(arr.valueOf());
// console.log(arr.toString());
// console.log(Number(arr));

// var arr2 = [5];
// console.log(arr2.valueOf());
// console.log(arr2.toString());

// 关于 valueOf 和 toString 其实是可以自己定义的
// console.log(Number({
//     valueOf:function(){
//         return 2;
//     }
// }));

// var obj = {
//     toString:function(){
//         return 5;
//     }
// }
// console.log(obj.valueOf());

// console.log(Number({
//     toString:function(){
//         return 5;
//     }
// }));

// console.log(Number({
//     valueOf: function () {
//         return 2;
//     },
//     toString: function () {
//         return 5;
//     }
// }));

// console.log(Number({
//     valueOf: function () {
//         return {};
//     },
//     toString: function () {
//         return {};
//     }
// }));

// 3-2 String() 转换对象

// 1. toString() ---> 原始类型值 ---> String()
// 2. valueOf() ---> 原始类型的值 ----> String()
// 3. 报错

// var obj = {a : 1};
// console.log(obj.toString());
// console.log(obj.valueOf());
// console.log(String(obj)); // [object Object]

// var obj = {
//     a : 1,
//     toString(){
//         return {}
//     },
// }
// console.log(String(obj));

// 3-3 Boolean

// console.log(Boolean(''));
// console.log(Boolean(""));
// console.log(Boolean(``));

// 上面介绍的是强制转换，也就是我们开发人员手动进行转换
// 接下来要介绍的是自动转换，程序内部自动发生

// console.log('4' - '3');
// 这里等价于 Boolean('abc')
// if('abc'){
//     console.log('Hello');
// }

// 快速转换为布尔值
// console.log(!!'abc'); // true


// console.log('5' + {}); // 5[object Object]
// 这里在做字符串的加法，那就变成了字符串的拼接
// 左边是字符串 OK
// 右边不是字符串，那么就需要调用 String() 转为字符串，所以 {} 就转为了 [object Object]
// 最后两个字符串拼接起来

// console.log('5' * []); // 0

// 首先这里是进行乘法操作，所以两边就都要转换为 number 类型

// 左边：Number('5') ----> 5
// 右边：[] 最终转换为了 0
// console.log([].valueOf()) // []
// [] 的 valueOf 拿到的仍然是 []，仍然是一个对象，接下来就要进行第二步
// 调用 toString 方法
// console.log([].toString()); // [] 得到的是一个空字符串
// 空字符串是原始值，因此可以使用 Number 转为数字
// console.log(Number('')); // 0
// 因此最终 [] 转换出来就为 0

// console.log('5' * [2]) // 10
// 右边：[2].valueOf()
// console.log([2].valueOf()); // [2]
// console.log([2].toString()); // 字符串的 2
// 最后 Number("2") 就变成了 2

// console.log("5" * [1,2]) // NaN
// console.log([1,2].valueOf()); // [ 1, 2 ] 仍然是数组
// console.log([1,2].toString()); // "1,2"
// console.log(Number("1,2")) // NaN

console.log(+'abc');