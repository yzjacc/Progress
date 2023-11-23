// function a(){
//     var i= 10;
//     console.log(i);
// }

// a()

// // 创建一个执行上下文环境
// // 开始执行代码


// var i = 1;
// console.log(i);

// 在执行上面的全局代码之前，还有一个准备工作
// 创建一个全局上下文

// console.log("Hello");
// function foo () { 
//     // ....
//     function bar () {        
//       return 'I am bar';
//     }
//     return bar();
// }
// foo();
// console.log("World");

// const foo = function(i){
//     console.log(b);
//     console.log(c);
//     var a = "Hello";
//     var b = function privateB(){};
//     function c(){}
// }
// foo(10);

// 生成一个 foo 的函数上下文环境

// 1. 创建上下文阶段

// vo 里面要确定的东西
// - 确定函数的形参（并赋值）
// - 函数环境会初始化创建 Arguments对象（并赋值）
// - 确定普通字面量形式的函数声明（并赋值）
// - 变量声明，函数表达式声明（未赋值）

// fooExecutionContext = {
//     // vo = {
//     //     i : 10,
//     //     arguments : {0 : 10, length : 1},
//     //     c : 指向 c 那个函数
//     //     a : undefined
//     //     b : undefined
//     // }
//     // this,
//     // scope
// }

// 2. 执行代码
// vo = {
//     i : 10,
//     arguments : {0 : 10, length : 1},
//     c : 指向 c 那个函数
//     a : "Hello"
//     b : privateB 函数
// }


(function () {
    console.log(typeof foo);
    console.log(typeof bar);
    var foo = "Hello";
    var bar = function () {
        return "World";
    }

    function foo() {
        return "good";
    }
    console.log(foo, typeof foo);
})()

// 上面的代码也会创建一个函数上下文

// 上下文的分为两个阶段：1. 创建阶段  2. 执行阶段
// 1. 创建阶段
// vo 里面要确定的东西
// - 确定函数的形参（并赋值）
// - 函数环境会初始化创建 Arguments对象（并赋值）
// - 确定普通字面量形式的函数声明（并赋值）
// - 变量声明，函数表达式声明（未赋值）
// 在进行变量声明的时候，如果发现该变量名已经存在，则不会再声明
// executionContext = {
//     vo : {
//         // foo : 指向 foo 函数
//         // bar : undefiend
//     },
//     // this,
//     // scope
// }

// 2. 执行代码
// vo : {
//     // foo : "Hello"
//     // bar : function A
// },


// console.log(typeof foo); // function
// console.log(typeof bar); // undefined
// var foo = "Hello";
// var bar = function A() {
//     return "World";
// }

// function foo() {
//     return "good";
// }
// console.log(foo, typeof foo); // Hello, string