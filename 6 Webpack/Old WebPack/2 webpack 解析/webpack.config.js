var htmlPlugin = require('html-webpack-plugin');
module.exports = {
    // 入口
    //  单个入口文件 字符串形式
    // entry: './src/index.js',
    // 对象形式  多个入口
    entry: {
        index: './src/index.js',
        // app:'./src/app.js',
    },
    // 输出  最低要求为一个对象  单个入口文件
    // output:{
    //     // 输出文件名称
    //     filename:'bundle.js',
    //     // 输出路径  必须为绝对路径
    //     path:'/dist'
    // },
    // 多个入口
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader','css-loader'] }
        ]
    },
    // 模式
    mode: 'development',

    // 插件
    plugins:[
        new htmlPlugin()
    ],

}