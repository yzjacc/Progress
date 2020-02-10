let fs = require('fs');
// // error-first
// // fs.readDir fs.writeFile  异步方法
// // node单线程  
// // node
// // fs.readFile('./data/number1.txt', 'utf-8', (err, data) => {
// //     fs.readFile(data, 'utf-8', (err, data) => {
// //         fs.readFile()
// //     })
// // });

// // promise化

// function readFile (path) {
//     return new Promise((res, rej) => {
//         fs.readFile(path, 'utf-8', (err, data) => {
//             if (err) {
//                 rej(err);
//             }else {
//                 res(data);
//             }
//         })
//     })
// }

// // readFile('./data/number1.txt').then(() => {}, () => {})



// //其他异步操作 
// // function writeFile (path) {
// //     return new Promise((res, rej) => {
// //         fs.wirteFile(path, 'utf-8', (err, data) => {
// //             if (err) {
// //                 rej(err);
// //             }else {
// //                 res(data);
// //             }
// //         })
// //     })
// // }

// // readDir
// // function readDir (path) {
// //     return new Promise((res, rej) => {
// //         fs.readDir(path, 'utf-8', (err, data) => {
// //             if (err) {
// //                 rej(err);
// //             }else {
// //                 res(data);
// //             }
// //         })
// //     })
// // }


// // promise


// function promisify (func) {
//     return function (...arg) {
//         return new Promise((res, rej) => {
//             func(...arg, (err, data) => {
//                 if (err) {
//                     rej(err);
//                 }else {
//                     res(data);
//                 }
//             })
//         });
//     }
// }

// // // promise化异步操作
// // let readFile = promisify(fs.readFile);
// // let writeFile = promisify(fs.writeFile);
// // let readDir = promisify(fs.readDir);

// // readFile('./data/number1.txt', 'utf-8').then((val) => {
// //     console.log(val)
// // });

// // 

// function promisifyAll (obj) {
//     for (let key in obj) {
//         let fn = obj[key];
//         if (typeof fn === 'function') {
//             obj[key + 'Async'] = promisify(fn);
//         }
//     }
// }

// promisifyAll(fs);
// // fs.readFile -> readFileAsync writeFile -> writeFileAsync  readDir -> readDirAsync
// // 

// fs.readFileAsync('./data/number1.txt', 'utf-8').then((val) => {
//     console.log(99, val)
// });



// // bluebird p
// //
// // let bluebird = require('bluebird');
// // bluebird.promisify(fs.readFile);



// 异步编程
// 1. 回调地狱
// 2. try catch 
// 3. 同步并发异步的结果




function readFile (path) {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                rej(err);
            }else {
                res(data);
            }
        })
    })
};
// readFile('./data/number1.txt').then((val) => {
//     return readFile(val);
// }, () => {}).then((val) => {
//     return readFile(val);
// }).then((val) => {
//     console.log(val)
// });

// function * read (url) {
//     let val1 = yield readFile(url);
//     let val2 = yield readFile(val1);
//     let val3 = yield readFile(val2);
//     return val3;
// };

// function Co (oIt) {
//     return new Promise((res, rej) => {
//          let next = (data) => {
//              let {value, done} = oIt.next(data);
//              if (done) {
//                  res(value);
//              }else {
//                  value.then((val) => {
//                      next(val);
//                  }, rej);
//              }
//          }
//          next();
//     });
//  }
 

 
// Co( read('./data/number1.txt') ).then((val) => {
//     console.log(val);
// });



//
async function read (url) {
    let val1 = await readFile(url);
    let val2 = await readFile(val1);
    let val3 = await readFile(val2);
    return val3;
};

read('./data/number.txt').then((val) => {
    console.log(val);
});

// try catch
// 同步并发的异步结果
// Promise.all 
// Promise.all([readFile('./data/number1.txt'), readFile('./data/number.txt'), readFile('./data/number2.txt')]).then((val) => {
//     console.log(val);
// }, (reason) => {
//     console.log(reason);
// });

// async+await 

// async function read1 () {
//     let val1 = null;
//     try {
//         val1 = await readFile('./data/number1.txt');
//         console.log(val1);
//     }catch(e) {
//         console.log(e)
//     }
// };
// async function read2 () {
//     let val2 = null;
//     try {
//         val2 = await readFile('./data/number.txt');
//         console.log(val2);
//     }catch(e) {
//         console.log(e, 2)
//     }
// };


// async function read3 () {
//     let val3 = null;
//     try {
//         val3 = await readFile('./data/number1.txt');
//         console.log(val3);
//     }catch(e) {
//         console.log(e)
//     }
// };
// function readAll(...args) {
//     args.forEach((ele) => {
//         ele();
//     });
// }

// readAll(read1, read2, read3);










