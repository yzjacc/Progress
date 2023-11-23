// 创建普通对象，添加属性
// var obj = {}; // ===>  new Object();
// obj.name = "zhangsan";

// var m = new Map();
// console.log(m);
// 添加键
// m.set("name", "xiejie");
// console.log(m);
// m.set("name","zhangsan");
// console.log(m);

// 通过一个二维数组，可以快速的初始化一个 map
// var arr = [
//     [true,"zhangsan"],
//     [1,18],
//     [function(){},"male"],
// ];
// var m2 = new Map(arr);
// console.log(m2);
// console.log(m2.size);
// console.log(m2.get('name'));

// 使用 has 方法查询某个键是否存在
// console.log(m.has("name"));

// var obj = {
//     name : "zhangsan",
//     age : 18,
//     gender : "male"
// }

// for(var i in obj){
//     console.log(obj[i]);
// }

// console.log(m2);
// for(var i of m2){
//     console.log(i);
// }


// var wm = new WeakMap();
// wm.set({"name":"xiejie"},2);
// // console.log(wm);
// wm.forEach((item)=>{
//     console.log(item);
// })

// const map = new Map();
// map.set('name', 'john');
// map.set('phone', 'iPhone');
// map.forEach(item=>{
//     console.log(item);
// })
// // john
// // iPhone


// set 基本用法
// var s = new Set();
// console.log(s);
// s.add(123);
// console.log(s);

// set 不允许添加相同的值

// s.add(123);
// console.log(s);

// var arr = [1,2,3,4,5,6,7];
// var s = new Set(arr);
// console.log(s);

// 利用 set 快速来为数组去重
// var arr = [1,2,2,4,3,3,5,2,1,4,5,2,6]
// arr = [...new Set(arr)];

// var arr = [1,2,3,4,5,6,7];
// var s = new Set(arr);
// console.log(s.delete(1));
// console.log(s);
// s.clear();
// console.log(s);

// 并集
// var arr1 = [1, 2, 3]
// var arr2 = [2, 3, 4]
// var newArr = [...new Set([...arr1, ...arr2])]
// console.log(newArr);

// 交集
var arr1 = [1, 2, 3]
var arr2 = [2, 3, 4]
var set1 = new Set(arr1)
var set2 = new Set(arr2)
var newArr = []
set1.forEach(item => {
    set2.has(item) ? newArr.push(item) : ''
})
console.log(newArr)