var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpack = require('clean-webpack-plugin');
module.exports = {
    entry: {
        pageA:'./src/pageA.js',
        pageB:'./src/pageB.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash:5].bundle.js",
        chunkFilename:"[name]-[hash:5].js"
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                common:{
                    name:'common',
                    chunks:'all',
                    minSize:1,
                    minChunks:2,
                    priority:1
                },
                vender: {
                    name:'vender',
                    test:/[\\/]node_modules[\\/]/,
                    priority:10,
                    chunks:"all"
                }
            },
 
        }

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