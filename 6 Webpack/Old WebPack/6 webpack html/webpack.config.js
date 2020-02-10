var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpack = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash:5].bundle.js",
        // publicPath:'/dist'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {loader:'style-loader'},
                    // { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // require('autoprefixer')(),
                                require('postcss-cssnext')(),
                                require('cssnano')({
                                    preset: 'default'
                                }), 
                            ]
                        }
                    },
                    { loader: 'less-loader' }],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]-[hash:5].css",
            // chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html',
          
            // 指定文件插入页面中
            // chunks:[],
            minify:{
                // 去掉空格
                // collapseWhitespace:true,
                // 清理注释
                removeComments:true
            }
        }),
        // 每次清除上一次的打包文件
        new CleanWebpack(),
    ],

}     