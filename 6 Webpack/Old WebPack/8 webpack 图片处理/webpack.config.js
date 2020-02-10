var path = require("path");
var CleanWebapck = require('clean-webpack-plugin');
var HtmlWebpack = require('html-webpack-plugin');
var Webpack = require('webpack');

module.exports = {
    entry:{
        index:'./index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name][hash:5].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'[name][hash:5].[ext]',
                            // 限制图片大小  <= 100kb 进行base64编码
                            limit:100,
                            outputPath:'img'
                        }
                    },
                    {
                        loader:'img-loader',
                        options:{
                            plugins:[
                                require('imagemin-pngquant')({
                                    quality:[0.3,0.5]
                                  }),
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader',
                        options:{
                            attrs:['img:src']
                        }
                    }
                ]
            }

        ]
    },
    mode:'development',
    plugins:[
        new CleanWebapck(),
        new HtmlWebpack({
            template:'./index.html'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],

}