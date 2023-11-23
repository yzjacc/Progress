// const start = Date.now(); // 获取当前的时间戳

// setTimeout(function fn1() {
//     console.log('setTimeout', Date.now() - start);
// }, 200)

// const fs = require('fs');
// fs.readFile('./index.js', 'utf-8', function f2() {
//     console.log('文件读取结束');
//     const start = Date.now();
//     // 强行延时 500 毫秒
//     while (Date.now() - start < 500) { }
// })
// fs.readFile('./index.js', 'utf-8', function f2() {
//     console.log('文件读取结束2');
//     const start = Date.now();
//     // 强行延时 500 毫秒
//     while (Date.now() - start < 500) { }
// })

// timer 队列：setTimeout
// poll 队列：readFile

// check 阶段

// console.log('start');
// setTimeout(()=>{
//     console.log('timer1');
//     Promise.resolve().then(function(){
//         console.log('promise1');
//     })
// },0)
// setTimeout(()=>{
//     console.log('timer2');
//     Promise.resolve().then(function(){
//         console.log('promise2');
//     })
// },0)
// Promise.resolve().then(function(){
//     console.log('promise3');
// })
// console.log('end');

// Promise 会被放入到微任务队列
// 会先清空微任务队列，再执行其他任务队列的回调任务
// start
// end
// promise3
// timer1
// promise1
// timer2
// promise2

// timer ：
// 微任务：

// setTimeout(function timeout() {
//     console.log('timeout');
// }, 0);
// setImmediate(function immediate() {
//     console.log('immediate');
// });

// const fs = require('fs');
// fs.readFile('./index.js', 'utf-8', function () {
//     setTimeout(() => {
//         console.log('timeout');
//     }, 0)
//     setImmediate(function immediate() {
//         console.log('immediate');
//     });
// })

// setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(function () {
//         console.log('promise1')
//     })
// }, 0)
// process.nextTick(() => {
//     console.log('nextTick')
//     process.nextTick(() => {
//         console.log('nextTick')
//         process.nextTick(() => {
//             console.log('nextTick')
//             process.nextTick(() => {
//                 console.log('nextTick')
//             })
//         })
//     })
// })

// nextTick
// nextTick
// nextTick
// nextTick
// timer1
// promise1


// timers : setTimeout
// 微任务队列：

setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
    process.nextTick(() => {
        console.log('nexttick');
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)

// 证明 nextTick 和 Promise 都是放入微任务队列
// 但是前者比后者的优先级高


// timer：setTimeout2
// 微任务：

// timer1
// nexttick
// promise1
// timer2
// promise2
