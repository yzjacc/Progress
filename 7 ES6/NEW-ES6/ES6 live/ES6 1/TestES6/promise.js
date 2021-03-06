// promise

// Promise就是一个对象。
// 承诺做某件事，然后成功了执行什么，失败了执行什么。
// 执行一段代码，成功了执行另一段代码，失败了执行一段代码。
//
// function doSomething() {
//     console.log("刺杀董卓");
//     var bool = true;
//     if (bool) {
//         success();
//     } else {
//         failed();
//     }
// }

// function success() {
//     console.log("庆功");
// }
//
// function failed() {
//     console.log("帮忙抚养孩子");
// }

// resolve(解决，成功了), reject(拒绝，失败了)
// new Promise(function (resolve, reject) {
//     console.log("刺杀董卓");
//     var bool = false;
//     if (bool) {
//         resolve();
//     } else {
//         reject();
//     }
// }).then(success, failed);

// Promise就是一个对象。(OK)
// 承诺做某件事，然后成功了执行什么，失败了执行什么。
// 执行一段代码(执行一个函数)，成功了执行另一段代码，失败了执行一段代码。
//
// function success() {
//     console.log("庆功");
// }
// function failed() {
//     console.log("帮养妻儿");
// }
//
// function MyPromise(func) {
//     var self = this;
//     self.status = 0;//0 执行中，1 成功了， 2 失败了    pending, fulfilled, rejected
//     function resolve() {
//         self.status = 1;
//     }
//     function reject() {
//         self.status = 2;
//     }
//     func(resolve, reject);
// }
// //
// MyPromise.prototype.then = function (success, failed) {
//     console.log(this.status);
//     if (this.status == 1) {
//         success();
//         return;
//     }
//     if (this.status == 2){
//         failed();
//         return;
//     }
// }
// //
// var obj = new MyPromise(function (resolve, reject) {
//     console.log("刺杀董卓");
//     var bool = false;
//     if (bool) {
//         resolve();
//     } else {
//         reject();
//     }
// })
// obj.then(()=> {
//     console.log("庆功");
// }, () => {
//     console.log("帮养妻儿");
// });
// console.log(obj.status);

// 一个Promise对象
// 帮忙执行一个方法
// 自动传入resolve和reject方法，resolve功能就是将状态置为成功，reject功能就是将状态置为失败。
// 在原型上写入一个then方法，有俩参数，用户自定义的成功或失败。（庆功或帮养妻儿）
// 因为是直接调用的，所以this指向当前的Promise对象，所以能读取到刚才设置的状态
// 如果成功，就执行成功的方法，如果失败就执行失败的方法。

// 1题, Promise的执行代码，不是异步的
// new Promise(function () {
//     console.log("1");
// });
// console.log("2");

// 2题，resolve不调用不执行（非常容易错），resolve是异步执行的。
// new Promise(function (resolve) {
//     resolve();
//     console.log("1");
// }).then(function () {
//     console.log("3");
// });
// console.log("2");

// 3题，抛异常，如果有reject，自动执行reject，
// 如果没有reject，会寻找链路上的最近的catch。
// 如果没有catch则报错。
// new Promise(function (resolve) {
//     console.log("1");
//     throw new Error("I'm Panda ~");
// }).then(
//     ()=>{console.log("3")},
//     ()=>{console.log("4")}
// ).catch(()=> {console.log("5")});
// console.log("2");

// try catch只能捕获当前线程的异常，不能捕获异步的异常。
// try {
//     console.log("1");
//     setTimeout(function () {
//         throw new Error("I'm Panda~!");
//     }, 0);
// } catch (e) {
//     console.log("3");
// }
// console.log("2");