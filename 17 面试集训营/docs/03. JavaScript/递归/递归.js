// 5!
// 5 * 4 * 3 * 2 *1
// 10!
// 10 * 9 * 8 * 7 * 6 .... * 1

// factorial(10) ---->  10!
// factorial(5) ---->  5!

// 委托
// 5! === 5 * 4! === 4 * 3! === 3 * 2! === 2 * 1! === 1

// function factorial(x) {
//     if (x === 1) {
//         return 1;
//     } else {
//         return x * factorial(x - 1);
//     }
// }
// console.log(factorial(5));

// func(x, y) ---->  从 x 加到 y
// 1，100 ---> 从 1 加到 100，1 + 2 + 3 + 4 ... + 99 + 100
// func(1,100) === 100 + func(1,99) === 99 + func(1,98) === func(1,1) === 1

// function func(x, y){
//     if(x === y){
//         return x;
//     } else {
//         return y + func(x, y-1);
//     }
// }
// console.log(func(1, 100));


// 递归第三个例子：斐波那契数列
// 0、1、1、2、3、5、8、13、21、34

// func(5) ----> 第 5 位所对应的斐波那契数 func(4) + func(3)

function func(x) {
    if (x === 1) {
        return 0;
    } else if (x === 2) {
        return 1;
    } else {
        return func(x - 1) + func(x - 2);
    }
}
console.log(func(7));