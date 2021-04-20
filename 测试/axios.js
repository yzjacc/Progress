// Promise.resolve().then(()=> {
//     console.log(1)
//     setTimeout(()=> {
//         console.log(2)
//     },0)
// })
// setTimeout(()=> {
//     console.log(3)
//     Promise.resolve().then(
//         console.log(4)
//     )
// },0)

// var name = 'global'
// function  a() {
//     console.log(name)
// }

// function b(){
//     var name = 'b';
//     a();
// }

// b();

// function a(){
//     console.log('1');
// }

// a();
// function a(){
//     console.log('2');
// }
// a();

// ************
// var a = function(){
//     console.log('1');
// }

// a();
// var a = function(){
//     console.log('2');
// }
// a();

// // ********
// var name = 'global'
// function a() {
//     console.log(name);
// }
// a();

// function b(){
//     var name = 'b';
//     function a(){
//         console.log(name);
//     }
//     a();
// }
// b()

// // *******
// var name = 'global'
// function a(){
//     console.log(this.name);
// }
// a();

// function b(){
//     var name = 'b';
//     function a(){
//         console.log(this.name);
//     }
//     a();
// }
// b()

//bind连续绑定不覆盖
// var obj = {  name: 1 }  
// var obj2 = {  name: 2 } 
// function b() {  console.log(this.name) }  b.bind(obj).bind(obj2)()


//catch方法写成一一个表达式 会最先执行

// Promise.resolve(1)
// .then((x)=> x + 1)
// .then((x)=> { throw new Error('My Error') })
// .catch(()=>1)
// .then((x)=>x + 1)
// .then((x)=>console.log(x))
// .catch(console.error)

//闭包
// var x = 10;
// function fn(){
//     console.log(x);
// }
// function show(f){
//     var x = 20;
//     (function(){
//        f();
//     })()  
// }

// show(fn);

// 1.toString()   //报错，JS引擎无法确定这里的`.`是什么意思，是点运算符（对象方法）还是浮点数？
// 1..toString()    //成功，运算结果"1" 解析: 第二个点被视为点运算符，前面的是浮点数。
// 1.0.toString()   //成功，运算结果"1" 解析: 第二个点被视为点运算符，前面的是浮点数。
// 1 .toString()    //成功，运算结果"1" 解析: 用空格和后面的.toString()隔开, 把前面的当成运算式处理
// 1+2.toString() //报错，JS引擎无法确定这里的`.`是什么意思，是点运算符（对象方法）还是浮点数？
// 1+2 .toString() //成功，运算结果"12" 解析: 用空格和后面的.toString()隔开, 把前面的当成运算式处理
// (1+2).toString() //成功，运算结果"3" 解析: 括号内部的先进行算法运算，在进行类型转换
// (1)+(2).toString() //运算结果"12" 解析: 括号内部进行类型修改并将数字n转换为字符串“n “，在进行拼接，然后再应用toString方法。
// (1)+(2)+0 .toString() //成功，运算结果"30" 解析: 如果有多个`+`号，且不包含中括号与""的情况下，则把最后一个加号之前的进行数学运算(不管他有没有被括号包住)，最后一个加号留作拼接作用。
// (1)+(2)+0+(11) .toString() //成功，运算结果"311" 解析: 同上
// (1)+(2)+0+12 .toString() //成功，运算结果"312" 解析: 同上
// ([1]+[2]+[3])+12 .toString() //成功，运算结果"12312" 解析: 如果里面只有方括号(单个数值的数组)，则+起连接作用
// ((1)+(2)+[3])+12+43 .toString()//成功，运算结果"331243" 解析: 如果里面包含圆括号，则先要进行运算，再把运算的结果与后面的内容拼接起来。
// (1)+(2)+6+2+5+"(15)"+1+0+(1) .toString() //成功，运算结果"16(15)101"解析: 如果字符串包裹的前面有多个加号，则把字符串双引号前面的进行运算(不管他有没有被圆括号包住)，得到的数值拼接上字符串包裹的内容再拼接上之后的内容。

// 数组扁平化
// (function flatten(arr = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]]) {
//     while(arr.some(item=>Array.isArray(item))) {
//         console.log(...arr);

//         arr = [].concat(...arr);
//     }
//     return arr;
// })();

// arr.flat(Infinity)


// (function MySort(arr = [5,1,6,2,5]) {
//     // write code here

//     // write code here
//     for (var i = 0; i < arr.length; i++) {
//         for (var j = 0; j < arr.length - i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 var temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;

//             }

//         }
//     }
//     console.log(arr);
//     return arr
// })()



// var a = [0];
// if (a) {
//   console.log(a == true);
// } else {
//   console.log(a);
// }

// var a = 10;
// (function () {
//     console.log(a);
//     a = 5;
//     console.log(a);
//     console.log(a);
//     let a = 20;// 如果var a=20改成let a = 20;打印什么
//     console.log(a);
// })()

// async function async1() {
// console. log( "async1 start");
// await async2();
// console. log( "async1 end");
// }

// async function async2() {
// console. log( "async2");
// }

// console. log( "script start");

// setTimeout( function() {
// console. log( "setTimeout");
// }, 0);

// async1();

// new Promise( function( resolve) {
// console. log( "promise1");
// resolve();
// }). then( function() {
// console. log( "promise2");
// });

// console. log( "script end");





// function fn() {
//     getName = function () { console.log('yifang') }
//     return this;
// }
// // fn.getName = function() { console.log('liudehua') }
// fn.prototype.getName = function() { console.log('zhangxueyou') }
// var getName = function() { console.log('zhouxingci') }
// function getName() { console.log('huangzesi') }
// // 依次以下代码分别输出什么 
// // fn.getName(); 
// // getName(); 
// // new fn.getName();
// //  new new fn.getName();




// // 下面代码分别输出多少， 为什么等于这么多讲讲解题思路
//  const res = [1,2,3,4].reduce((total,p,i) => total + i ); 
//  console.log(res); 
//  // 输出多少 
//  const res1 = [1,2,3,4].reduce((total,p,i) => total + i, 0); 
//  console.log(res1); // 输出多少


// // 下面代码分别输出是什么， 为什么 
// setTimeout(() => console.log('1')) 
// const p = new Promise((resolve, reject) => {  console.log('2')   
// for(let i = 0; i< 100; i++) {  console.log('3');  if(i === 9) resolve('4')  } }) 
// p.then(e => {  console.log(e) }) 
// console.log('5');




// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
//   }
  
//   async function async2() {
//     console.log('async2 start');
//     return new Promise((resolve, reject) => {
//       resolve();
//       console.log('async2 promise');
//     })
//   }
  
//   console.log('script start');
  
//   setTimeout(function() {
//     console.log('setTimeout');
//   }, 0);
  
//   async1();
  
//   new Promise(function(resolve) {
//     console.log('promise1');
//     resolve();
//   }).then(function() {
//     console.log('promise2');
//   }).then(function() {
//     console.log('promise3');
//   });
  
//   console.log('script end')

 

  