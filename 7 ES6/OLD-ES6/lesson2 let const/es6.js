// let（块级变量声明）：
// 	没有变量声明提升、不能重复定义、不挂载到window

// 	声明的变量和{}配合产生块级作用域-生命在大括号内部的变量无法在外部使用
	
// 	产生临时Temporal Dead Zone （临时死区）
	
// 	解决闭包问题（ES6规范后引入的）


// const （块级常量声明）：
// 	其存储量的空间不可以被改变、其余和let一样

// let a = 5
// let a = 6 //var 可以 let错误
// {
//     console.log(a);
// }

if (true) {
    var a = 10;
    console.log(a);
}
console.log(a);



let i = 0;
while (i < 5) {
    i++;
    let b = 10 + i;
    console.log(b);
};
console.log(i);