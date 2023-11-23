// 该函数就是接受不了多个参数
// function add(x, y) {
//     return x + y;
// }
// console.log(add(1, 2)); // 3
// console.log(add(5, 7)); // 12


// 接下来我们要将其进行柯里化

// function add(x){
//     return function(y){
//         return x + y;
//     }
// }

// console.log(add(1)(2));

// 固定参数

// function check(reg, txt) {
//     return reg.test(txt)
// }

// // 即使是相同的正则表达式，也需要重新传递一次
// console.log(check(/\d+/g, 'test1')); // true
// console.log(check(/\d+/g, 'testtest')); // false

// function check(reg){
//     return function(str){
//         return reg.test(str);
//     }
// }

// var func = check(/\d+/g);
// console.log(func('test1'));
// console.log(func('testtest'));
// console.log(func('abc'));


// console.log(check(/[a-z]+/g)('test'));


// 封装一个通用的柯里化函数

// function curry() {
//     var fn = arguments[0]; // 拿到要执行的函数
//     var args = Array.prototype.slice.call(arguments, 1);
//     // 接下来，我们就需要判断这个参数是否足够
//     if(args.length === fn.length){
//         // 进入此 if，说明第一次参数就是传够了的
//         // 直接执行 fn 函数
//         return fn.apply(this, args);
//     }
//     // 下面是处理参数不够的情况
//     function _curry(){
//         args.push(...arguments);
//         if(args.length === fn.length){
//             return fn.apply(this, args);
//         }
//         return _curry;
//     }
//     return _curry;
// }

// // 测试 1
// function add(a, b, c) {
//     return a + b + c;
// }

// console.log(curry(add)(1)(2)(3)); // 6
// console.log(curry(add, 1)(2)(3)); // 6
// console.log(curry(add, 1, 2, 3)); // 6
// console.log(curry(add, 1)(3, 4)); // 8

// var addCurrying = curry(add)(2);
// console.log(addCurrying(7)(8)); // 17

// // 测试 2
// function check(reg, txt) {
//     return reg.test(txt)
// }
// var hasNumber = curry(check)(/\d+/g);
// console.log(hasNumber('test1'));// true


// 一道面试题

// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;


function add(){
    // 拿到第一次调用的所有的参数
    var args = Array.prototype.slice.call(arguments);
    
    // 该函数会被返回，该函数的作用是继续收集参数
    function _adder(){
        args.push(...arguments);
        return _adder;
    }

    // 当调用 toString 方法的时候，说明我不要再接收参数了
    // 执行计算操作
    _adder.toString = function(){
        return args.reduce((a,b)=>a+b);
    }

    return _adder;
}

console.log(add(1)(2)(3).toString())
console.log(add(1, 2, 3)(4).toString())
console.log(add(1)(2)(3,4,5)(6,7).toString())

