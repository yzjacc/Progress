// 单独提取css文件
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清理out文件夹
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 抽离html文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry:{
        index:'./src/js/meituan.js',
        info:'./src/js/goodsInfo.js'
    },
    // 出口
    output:{
        filename:'[name]-[hash:5].js',
        path:__dirname + '/out'
    },
    // loaders使用
    module:{
        rules:[
            // js
            { test: /(\.js)$/, use:['babel-loader'] },
            // css
            { test:/(\.css)$/, use:[MiniCssExtractPlugin.loader,'css-loader'] },
            // 处理图片及字体图标
            { test: /(\.jpg|png|svg|eot|ttf|woff)/,use:['url-loader?limit=1000&name=./[name].[ext]']}
        ]
    },
    plugins:[
        // 抽离css文件
        new MiniCssExtractPlugin({
            filename:'[name]-[hash:5].css'
        }),
        // 清理out文件夹
        new CleanWebpackPlugin(),
        // 首页html
        new HtmlWebpackPlugin({
            template:'./meituan-index.html',
            filename:'index.html',
            minify:{
                // 移除注释
                removeComments:true
            },
            // 对应引入的js包
            chunks:['index']
        }),
        // 跳转页
        new HtmlWebpackPlugin({
            template:'./meituan-detail.html',
            filename:'detail.html',
            minify:{
                removeComments:true
            },
            chunks:['info']
        })
    ],
    mode:'development',
    devServer:{
        port:'9191'
    }
}