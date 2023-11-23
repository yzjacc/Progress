// 只要这个函数是以普通函数的形式被调用
// function fn1(){
//     console.log(this); // 指向全局对象
// }
// fn1();

// 如果是严格模式，那么 this 的值为 undefiend
// function fn2(){
//     'use strict'
//     console.log(this);
// }
// fn2();

// 上面介绍了以函数的形式调用，this 的指向
// 这种题目有一种变形
// var foo = {
//     bar : 10,
//     func(){
//         console.log(this);
//         console.log(this.bar);
//     }
// }
// var fn2 = foo.func;
// fn2();
// foo.func();

// 如果一个函数是以对象的方法的形式被调用
// 那么 this 指向该对象
// var stu = {
//     name : "zhangsan",
//     fn(){
//         return this;
//     }
// }
// console.log(stu.fn() === stu);

// var stu = {
//     name : "zhangsan",
//     son : {
//         name : "zhangxiaosan",
//         fn(){
//             return this.name;
//         }
//     }
// }
// console.log(stu.son.fn());

// var o1 = {
//     text : 'o1',
//     fn(){
//         return this.text;
//     }
// }

// var o2 = {
//     text : 'o2',
//     fn(){
//         return o1.fn();
//     }
// }

// var o3 = {
//     text : 'o3',
//     fn(){
//         var fn2 = o1.fn;
//         return fn2(); // 这里就相当于是普通函数的形式被调用
//     }
// }
// console.log(o1.fn()); // o1
// console.log(o2.fn()); // o1
// console.log(o3.fn()); // undefined

// call
// A.call(B)
// A 通常是一个方法（函数）
// B 通常是一个对象
// 调用 A 方法，但是 this 指向 B 这个对象

// var obj = {};
// function fn(){
//     return this;
// }
// console.log(fn() === global);
// console.log(fn.call(obj) === obj);

// 下面的情况，this 指向全局对象
// console.log(fn.call());
// console.log(fn.call(null));
// console.log(fn.call(undefined));
// 总之，this 就指向你传入进去的对象

// console.log(fn.call(true));

// call 第一个参数是 this 指向的对象
// 之后的参数就是参数列表，这些参数会传递给前面的方法
// function add(a, b){
//     return a + b;
// }
// console.log(add.call(null, 1, 2));

// call 一个经常的应用，就是调用原生的方法

// var obj = {};
// hasOwnProperty 该方法是查看一个对象是否有某一个属性或者方法
// 这个属性或者方法必须是自身就有的，而不是继承而来
// console.log(obj.hasOwnProperty('toString')); // false
// console.log(obj.toString()); // [object Object]

// 通过上面的例子，我们可以知道
// obj 能够调用 toString，但是 toString 这个方法并不是他自身所拥有的
// 来自于它的原型对象上面

// obj.hasOwnProperty = function(){
//     return 'aaaaa';
// }
// console.log(obj.hasOwnProperty('toString'));  // aaaaa

// 上面我们对 hasOwnProperty 这个方法进行了覆盖
// 使用 call 可以调用原生的方法
// console.log(Object.prototype.hasOwnProperty.call(obj, 'toString'));;

// apply
// 该方法和 call 基本上一模一样
// 区别仅仅是后面参数的区别，call 后面是参数列表
// 而 apply 后面是一个参数数组

// 使用 apply 调用原生方法

// var arr = [1, 2, 3, 4, 5];

// console.log(Math.max.apply(null, arr));

// console.log(Array.prototype.slice.apply({ 0: 1, 1: 2, 2: 3 }));
// console.log(Array.prototype.slice.apply({ 0: 1, 1: 2, 2: 3, length:3 }));
// console.log(Array.prototype.slice.apply({ 0: 1, 1: 2, 2: 3, length:5 }));
// console.log(Array.prototype.slice);

// bind 绑定 this 指向，返回一个新的函数

// var d = new Date();
// console.log(d);
// console.log(d.getTime());

// var fn = d.getTime;
// fn();
// 上面的调用方式，使得 this 指向了全局对象，而非 Date 实例对象
// 下面使用 bind 来绑定

// var fn = d.getTime.bind(d);
// console.log(fn());

// bind 示例2
// var counter = {
//     count : 0,
//     add(){
//         this.count++;
//     }
// }
// var obj = {
//     count : 100
// }
// var fn = counter.add.bind(obj);
// fn();
// console.log(counter.count);
// console.log(obj.count);


// var counter = {
//     count : 0,
//     add(){
//         'use strict'
//         this.count++;
//     }
// }

// function callback(fn){
//     fn();
// }

// callback(counter.add);
// console.log(counter.count); // 1

// var obj = {
//     name : "zhangsan",
//     arr : [1,2,3],
//     print(){
//         this.arr.forEach(function(n){
//             console.log(this.name);
//             console.log(this === global);
//         }.bind(this))
//     }
// }
// obj.print();

// bind 方法结合 call 方法使用


// console.log([1, 2, 3].slice(0, 1));

// slice 方法来源于 Array.prototype

// console.log(Array.prototype.slice.call([1, 2, 3], 0, 1));

// call 方法来源于 Function.prototype
// var slice = Function.prototype.call.bind(Array.prototype.slice);
// 这里就相当于改写了 slice 方法
// 以前用 slice 方法 [1,2,3].slice(0,1)
// console.log(slice([1,2,3], 0, 1));

// function fn(){
//     console.log(this.v);
// }

// var obj = {
//     v : 123
// }

// var func = Function.prototype.call.bind(Function.prototype.bind);
// func(fn, obj)();


// 箭头函数 this 指向
// var x = 20;
// const obj = {
//     x: 10,
//     test: () => {
//         console.log(this); // {}
//         console.log(this.x); // undefined
//     }
// }
// obj.test();

// var obj = {
//     name: '张三',
//     times: [1, 2, 3],
//     print: function () {
//       this.times.forEach((n)=>{
//         console.log(this.name);
//       });
//     }
//   };
  
//   obj.print()

// var name = "JavaScript";
// const obj = {
//     name: "PHP",
//     test: function () {
//         const i =  ()=> {
//             console.log(this.name);
//             // i 是以函数的形式被调用的，所以 this 指向全局
//             // 在浏览器环境中打印出 JavaScript，node 里面为 undeifned
//         }
//         i();
//     }
// }
// obj.test();

// 箭头函数不能作为构造函数
const Test = (name, age) => {
    this.name = name;
    this.age = age;
};
const test = new Test("xiejie", 18);