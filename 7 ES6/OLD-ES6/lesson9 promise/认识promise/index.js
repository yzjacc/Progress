// let a = 10;
// console.log(a);

// 
let fs = require('fs');


// 
// 异步操作
// node javascript es6 Promise
// Promise
// fs.readFile('./data/number.txt', 'utf-8', (err, data) => {
//     if (data) {
//         fs.readFile(data, 'utf-8', (err, data) => {
//             if (data) {
//                 fs.readFile(data, 'utf-8',  (err, data) => {
//                     console.log(data);
//                 });
//             }
//         })
//     }
// });


// process.on('uncaughtException', (err) => {
//     console.log(err, 'okok')
// });

// try {
//     fs.readFile('./data/number.txt', 'utf-8', (err, data) => {
//         console.log(data)
//         // try {
//             throw new Error('1111')
//         // }catch(e) {
//         //     console.log(e, 'okok');
//         //     console.log(9)
//         // }
//     });
// }catch(e) {
//     console.log(e, 'ok');
// }


// 并发异步操作，最后我们想得到所有的结果

// 几个并发操作，获得几个结果。
let oStudent = {

};

function show (data) {
    console.log(data);
};

function show2 (data) {
    console.log(data, 2);
}

fs.readFile('./data/number.txt', 'utf-8',  (err, data) => {
    if (data) oStudent.number = data;
    Store.fire(oStudent);
});

fs.readFile('./data/name.txt', 'utf-8',  (err, data) => {
    if (data) oStudent.name = data;
    Store.fire(oStudent);
});

fs.readFile('./data/score.txt', 'utf-8',  (err, data) => {
    if (data) oStudent.score = data;
    Store.fire(oStudent);
});


// function after (times, cb) {
//     return function () {
//         --times == 0 && cb.apply(null, arguments);
//     }
// }
// let newShow = after(3, show);


// Promise 原理

// 发布订阅
let Store = {
    list: [],
    times: 3,
    subscribe (func) {
        this.list.push(func);
    },
    fire (...arg) {
        --this.times == 0 && this.list.forEach((ele) => {
            ele.apply(null, arg);
        });
    }
}

Store.subscribe(show);
Store.subscribe(show2);
