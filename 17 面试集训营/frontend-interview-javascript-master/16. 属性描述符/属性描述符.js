// var obj = {};
// obj.name = "xiejie";
// obj.age = 18;
// obj.age = "aaaaa";


// console.log(obj.name);


// var obj = {};
// obj.x = 100;

// 接下来我们通过属性描述符的形式来添加属性
// 属性描述符是一个对象，作为第三个参数传入
// Object.defineProperty(obj, 'x', {
//     value : 100,
//     writable : false
// })
// console.log(obj.x);
// obj.x = 200;
// console.log(obj.x);

// 获取某一个对象的属性的属性描述符
// console.log(Object.getOwnPropertyDescriptor(obj, 'x'));

// var obj = Object.defineProperty({}, 'x', {
//     value : 100,
//     configurable: true  // 禁止配置
// });
// obj.x = 5;  //试图修改其值
// console.log(obj.x);  //修改失败，返回undefined
// delete obj.x;
// console.log(obj.x);

// // 包括如果想要重新定义属性描述符也是不可以的
// Object.defineProperty(obj,'x',{
//     value : 10
// })

// getter 和 setter 示例

// var obj = Object.create(Object.prototype, {
//     // 私有属性，不对外
//     _x: {  //数据属性
//         value: 1,  //初始值
//         writable: true
//     },
//     // 对外的，外部可以访问和修改
//     x: {  //访问器属性
//         // 通过 getter 和 setter 访问器来访问和设置属性值，可以做一些限制。
//         get: function () {  //getter
//             return this._x;  //返回_x属性值
//         },
//         set: function (value) {  //setter
//             if (typeof value != "number") {
//                 throw new Error('请输入数字');
//             }
//             this._x = value;  //赋值
//         }
//     }
// });
// console.log(obj.x);  // 1
// obj.x = 100;
// console.log(obj.x); // 100

// obj.x = "2";  //抛出异常

// var obj = {
//     _x: 1,  // 定义 _x 属性
//     get x() { 
//         return this._x 
//     },  //定义 x 属性的 getter
//     set x(value) {  //定义 x 属性的 setter
//         if (typeof value != "number") {
//             throw new Error('请输入数字');
//         }
//         this._x = value;  // 赋值
//     }
// };
// console.log(obj.x);  //1
// obj.x = 2;
// console.log(obj.x);  //2


// var obj = {};
// obj.name = "xiejie";
// obj.age = 18;

// // console.log(Object.getOwnPropertyNames(obj));

// console.log(obj.propertyIsEnumerable('name'));

// var obj = Object.create(Object.prototype, {
//     _x: {  //数据属性
//         value: 1,  //初始值
//         writable: true
//     },
//     x: {  //访问器属性
//         configurable: true,  //允许修改配置
//         get: function () {  //getter
//             return this._x;  //返回_x属性值
//         },
//         set: function (value) {
//             if (typeof value != "number") {
//                 throw new Error('请输入数字');
//             }
//             this._x = value;  //赋值
//         }
//     }
// });
// var des = Object.getOwnPropertyDescriptor(obj, "x");  //获取属性x的属性描述符
// console.log(des);
// des.set = function (value) {
//     //修改属性x的属性描述符set函数
//     //允许非数值型的数字，也可以进行赋值
//     if (typeof value != "number" && isNaN(value * 1)) {
//         throw new Error('请输入数字');
//     }
//     this._x = value;
// }
// obj = Object.defineProperty(obj, "x", des);
// console.log(obj.x);  //1
// obj.x = "2";  //把一个给数值型数字赋值给属性x
// console.log(obj.x);  //2


function extend(toObj, fromObj) {  //扩展对象
    for (var property in fromObj) {  //遍历对象属性
        if (!fromObj.hasOwnProperty(property)) continue;  //过滤掉继承属性
        Object.defineProperty(  //复制完整的属性信息
            toObj,  //目标对象
            property,  //私有属性
            Object.getOwnPropertyDescriptor(fromObj, property)  //获取属性描述符
        );
    }
    return toObj;  //返回目标对象
}

var obj = {
    name : "xiejie",
    age : 18
}

var obj2 = {};
Object.defineProperty(obj2,'x',{
    value : 100,
    writable : false,
    enumerable : true
})

extend(obj,obj2);
console.log(obj);
obj.x = 200;
console.log(obj.x);