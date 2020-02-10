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

import fun from './axios.js'
fun();
console.log("hjdjwa")