// 张三
// let oInput = document.getElementById('inp');
// let oBtn = document.getElementById('btn');

// @Skin
// class Search {
//     constructor () {
//         this.keyValue = '';
//     }
//     @myReadOnly
//     url = 'urlA-';

//     @dealData('张三')
//     getContent (a, b) {
//         console.log('向' + this.url + '发送网络请求, 数据:' + this.keyValue, a, b);
//         return 10;
//     }
// };

// function Skin (target) {
//     target.aaa = 30;
// }


// let oS = new Search();
// // oS.url = 20;

// oInput.oninput = function () {
//     oS.keyValue = this.value;
// };

// oBtn.onclick = function () {
//     oS.getContent(1, 2);
// };


// 

// 李四 

// 装饰私有属性 
// function myReadOnly (proto, key, descriptor) {
//     // console.log(proto, key, descriptor);
//     descriptor.writable = false;
//     descriptor.initializer = function () {
//         return 6;
//     }
// }

// 原型上的属性的话
// function dealData (proto, key, descriptor) {
//     console.log(proto, key, descriptor);
//     let oldValue = descriptor.value;
//     // 代理思想
//     descriptor.value = function () {

//         var urlB = 'urlB-';
//         console.log('向' + urlB + '发送网络请求, 数据:' + this.keyValue);

//         return oldValue.apply(this, arguments);
//     }
// }


// function dealData (ms) {
//     return function (proto, key, descriptor) {
//         console.log(proto, key, descriptor);
//         let oldValue = descriptor.value;
//         // 代理思想
//         descriptor.value = function () {
    
//             var urlB = 'urlB-';
//             console.log('向' + urlB + '发送网络请求, 数据:' + this.keyValue + ms);
    
//             return oldValue.apply(this, arguments);
//         }        
//     }
// }







































// var keyValue = '';
// oInput.oninput = function () {
//     keyValue = this.value;
// };

// oBtn.onclick = function () {
//     newGetContent(keyValue);
// };

// function getContent (data) {
//     var url = 'urlA-';
//     console.log('向' + url + '发送网络请求, 数据:' + data);
// }

// var newGetContent = dealFunc(getContent);




// 李四
// function dealFunc (func) {
//     return function (data) {
//         // 
//         var urlB = 'urlB-';
//         console.log('向' + urlB + '发送网络请求, 数据:' + data);
//         return func.apply(this, arguments);
//     }
// };   