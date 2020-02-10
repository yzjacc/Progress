// 写 收集

// function sum (flag, ...arg, bool) {
//     console.log(flag, arg, bool);
// };

// // 计算不同个数参数的和

// sum('2', 1, 2, 3, true);
// sum('3', 1, 2, false);

// 进行排序 去掉最高分和最低分
// function average (...arg) {
//     // 去掉最高分和最低分功能
//     arg.sort(function (a, b) {
//         return a - b;
//     });
//     arg.pop();
//     arg.shift();
//     return getScore(...arg);
// }

// 传一堆分数 返回平均值
// function getScore (...arg) {
//     var sum = 0;
//     sum = arg.reduce(function (prevV, curV) {
//         prevV += curV;
//         return prevV;
//     }, sum);
//     return sum / arg.length;
// }


// console.log( average(97, 99, 93, 94, 92, 89, 87, 90) );
// console.log( average(97, 95, 95, 96, 92, 89, 90, 92) );


//读 展开 spreed

// let arr = [1, 2, 3];
// console.log(...arr);

// 合并
// 你不知道的js纯函数 
// function combineCompoany (...arg) {
//     let _company = ['alibaba', 'baidu', 'tencent'];
//     return [..._company, ...arg];
// };


// let newArr = combineCompoany('duyi', 'tuoter');


// ES6 ...

// ES7 ...  {}

// let company = {
//     name: 'duyi',
//     age: 18
// };

// let leader = {
//     name: 'cg',
//     age: 20
// }

// let teachDepartment = {
//     leader: {
//         ...leader
//     },
//     personNum: 25,
// }


// console.log( Object.assign({}, company, teachDepartment) );


// let obj = {
//     ...company,
//     ...teachDepartment,
//     leader: {
//         ...leader
//     }
// };

// obj.leader.name = 'stg';

// 

// let obj = JSON.parse(JSON.stringify(teachDepartment));
// obj.leader.name = 'stg';