// function a(){
//     function b(){
//         function c(){

//         }
//         c();
//     }
//     b();
// }
// a();

// var obj = {
//     name : "xiejie",
//     age : 18,
//     score : 100,
//     newStu : {
//         name : "zhangsan",
//         age : 19
//     }
// }

// var a = 10;
// var b = 10;
// console.log(a === b); // true

// var arr1 = [1,2,3];
// var arr2 = [1,2,3];
// console.log(arr1 === arr2); // false

var obj = {};
obj.name = "xiejie";
console.log(obj.name); // xiejie

var str = "Hello";
str.name = "xiejie";
console.log(str.name); // undefinded
