var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var Webpack = require("webpack");
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
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // require('autoprefixer')(),自动添加前缀
                                require('postcss-cssnext')(),//下个版本css语法
                                require('cssnano')({
                                    preset: 'default'//压缩css
                                }), 
                            ]
                        }
                    },
                    { loader: 'less-loader' }],
                }
            ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]-[hash:5].css",
            // chunkFilename: "[id].css"
        }),
        // 每次清除上一次的打包文件
        new CleanWebpack(),
        new Webpack.HotModuleReplacementPlugin()
    ],

}     