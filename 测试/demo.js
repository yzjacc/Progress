// function a(name){
//     // create this
//     this.name = name;
//     // return this;
// }
// a.prototype.abc = function (){
//     console("hdwjaodjwaj")
// }
// var abc = new a("haha");

// class a {
//     abc(){
//         console.log("ghjwka")
//     }
// }
// a.abc()

// (function (){

//     var a = b= 3;

// })()
//     console.log("a defined? "+ (typeof a!=='undefined')) //false
//     console.log("a defined? "+ (typeof a!== undefined))   //true



    // function Person(){
    //     // var this = {};
    //     this.a = 10;
    //     this.b = 20;
    //     // return this;
    // }
    // Person.prototype.c =20;
    // var xiaoming = new Person() 
    // xiaoming.c ??? 
    // // xiaoming == {a=10,
    //             // b=20
    //             // };

//     var arr = [4,1,6,9,3,2,8,7];

//     function sort(arr){
//         for (let i = 0; i  < arr.length - 1; i++) {
//           var maxIndex = 0;
//           for (let j = 0; j < arr.length - 1 - i; j++){
//               if(arr[maxIndex] > arr[j]){
//                 maxIndex = j
//               }
//           }
//           var temp = arr[maxIndex];
//           arr[maxIndex] = arr[arr.length - 1- i];
//           arr[arr.length - 1- i] = temp;
//         }
//     }
// console.log(sort(arr),arr);


// window.getCount()
// ( this == User ).getCount()

// var  a =  10;
// b = a;











// var uer = function (){
//   return this.count;
// } 


// var func = hahah

// func();




// function fun(a,b,c,d,e){
//   console.log(arguments);
// }
// fun(1,2,3,4,5);

// function Find(target, array)
// {
//     // write code here
//     var m = array.length;
//     var n = array[0].length;
//     var i = 0, j = n - 1;
//     while(i < m && j>=0){
//         if(target>array[i][j]){
//             i++;
//         } else if(target<array[i][j]){
//             j--;
//         } else {
//             return true;
//         }
//     }
//     return false;
// }
//
// import fun from './axios.js'
// fun();
// console.log("hjdjwa")

// var obj = {
//     name:"kevin",
//     age:1
// }
//
// for (const prop in obj) {
//     console.log(prop)
// }
//
// for (const i = 0; i < 10; i++) {
//
// }
// 9)); // 1+2*8-9function cal(a, b, c, d) {
// //     return a + b * c - d;
// // }
// // //curry：柯里化，用户固定某个函数的前面的参数，得到一个新的函数，新的函数调用时，接收剩余的参数
// // function curry(func, ...args) {
// //     return function(...subArgs) {
// //         const allArgs = [...args, ...subArgs];
// //         if (allArgs.length >= func.length) {
// //             //参数够了
// //             return func(...allArgs);
// //         } else {
// //             //参数不够，继续固定
// //             return curry(func, ...allArgs);
// //         }
// //     }
// // }
// //
// // const newCal = curry(cal, 1, 2)
// //
// // console.log(newCal(3, 4)) // 1+2*3-4
// // console.log(newCal(4, 5)) // 1+2*4-5
// // console.log(newCal(5, 6)) // 1+2*5-6
// // console.log(newCal(6, 7)) // 1+2*6-7
// //
// // const newCal2 = newCal(8)
// //
// // console.log(newCal2(

class Test {

    constructor() {
        this.a = 123;
    }

    print = () => {
        console.log(this.a)
    }
}

const t1 = new Test();
const t2 = new Test();
console.log(t1.print === t2.print)


