// var str = "Hello"; // 当使用属性方法时，内部调用 new String("Hello") 生成一个临时的包装对象
// var str2 = new String("World");


// var i = 1; // 当使用属性方法时，内部调用 new Number(1) 生成一个临时的包装对象
// var j = new Number(3.1415926);

// var isPass = true;
// var isPass2 = new Boolean(false);

// console.log(j.toFixed(2));
// console.log(str.charAt(0));
// console.log((1).toFixed(2));

// 通过上面第 11、12、13 行代码，我们惊讶的发现普通数据类型也可以使用属性方法
// 因为当我们使用属性和方法的时候，JS 内部会自动进行一个转换
// 会自动生成一个包装对象


// var test = {};
// test.name = "xiejie";
// test.sayHello = function(){
//     console.log("Hello");
// }
// console.log(test.name);
// test.sayHello();

// var i = 1;
// i.test = "Hello";
// console.log(i.test);

// 当执行 29 行代码的时候，实际上后台执行了以下的操作：
// var _i = new Number(1);
// _i.test = "Hello";
// _i.test = null;

// 如果直接声明的时候就是包装对象类型
// 那么是可以添加属性方法的，因为是一个对象
// var i = new Number(1);
// i.test = "Hello";
// console.log(i.test);

var i = 1;
Number.prototype.test = "Hello";
console.log(i.test);