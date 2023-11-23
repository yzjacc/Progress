// // 电脑类
// // 通过 ES6 的 class 语法来创建一个类
// class Computer1{
//     // 构造器
//     constructor(name, price){
//         // 实例属性
//         this.name = name;
//         this.price = price;
//     }
//     // 实例方法
//     showPrice(){
//         console.log(`这台${this.name}电脑的价格为${this.price}元。`);
//     }
//     // 静态方法
//     static staticFunc(){
//         console.log("这是 Computer1 类的静态方法");
//     }
// }
// // var apple = new Computer("苹果", 15000);
// // console.log(apple.name); // 苹果
// // console.log(apple.price); // 15000
// // apple.showPrice();
// // Computer.staticFunc();


// // 使用 ES5 的构造函数的方法来创建
// function Computer2(name, price){
//     this.name = name;
//     this.price = price;
// }
// Computer2.prototype.showPrice = function(){
//     console.log(`这台${this.name}电脑的价格为${this.price}元。`);
// }
// Computer2.staticFunc = function(){
//     console.log("这是 Computer2 类的静态方法");
// }



// var apple = new Computer1("苹果", 15000);
// // new apple.showPrice()

// var huawei = new Computer2("华为", 12000);
// console.log(new huawei.showPrice());


"use strict";
// 核对 class 类的调用方法，如果是以普通函数的形式调用的，就会抛出错误
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

// 对原型和静态方法做特殊处理，设置其特性
function _defineProperties(target, props) {

    // console.log("target:::",target);
    // console.log("props:::",props);
    // target::: {}
    // props::: [ { key: 'showSth', value: [Function: showSth] } ]
    // target::: [Function: Computer]
    // props::: [ { key: 'comStruct', value: [Function: comStruct] } ]

    // 遍历原型方法和静态方法
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
            descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

// 调用前面的函数，对原型方法和静态方法进行特性设置
function _createClass(Constructor, protoProps, staticProps) {

    console.log("Constructor:::",Constructor);
    console.log("protoProps:::",protoProps);
    console.log("staticProps:::",staticProps);
    // Constructor::: [Function: Computer]
    // protoProps::: [ { key: 'showSth', value: [Function: showSth] } ]
    // staticProps::: [ { key: 'comStruct', value: [Function: comStruct] } ]

    if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
        _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Computer = /*#__PURE__*/function () {
    // 构造器
    function Computer(name, price) {
        // 1. 核对你是如何进行调用的
        _classCallCheck(this, Computer);

        this.name = name;
        this.price = price;
    } 


    _createClass(Computer, [{
        key: "showSth",
        value: function showSth() {
            console.log("\u8FD9\u662F\u4E00\u53F0".concat(this.name, "\u7535\u8111"));
        } // 原型方法

    }], [{
        key: "comStruct",
        value: function comStruct() {
            console.log("电脑由显示器，主机，键鼠组成");
        } // 静态方法
    }]);

    return Computer;
}();


var apple = new Computer("苹果",15000);