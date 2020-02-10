// 
// 新特性：

    // static property = xxx; 静态属性
    // property = xxx; 私有属性
    // @decorator 装饰器

    // 提案特性需要下载：

    // npm install @babel/plugin-proposal-decorators

    // 需要配置：

    // {
    // "plugins": [
    //     ["@babel/plugin-proposal-decorators", { "legacy": true }],
    //     ["@babel/plugin-proposal-class-properties", { "loose" : true }]
    // ]
    // }
// class Search {
//     // ES7
//     static num = 10;
//     // ES6
//     // static num () {
//     //     return 6;
//     // }
//     constructor () {
//         this.keyValue = '';
//     }
//     @readOnly
//     // ES7 私有属性 定义方式
//     url = 'urlA-';
//     getCount () {
//         console.log('发送请求');
//     }
// };

// var oS = new Search();
// console.log(oS);