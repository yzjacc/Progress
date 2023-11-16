const { defineConfig } = require('@vue/cli-service')
// package.json的name需注意与主应用一致
const { name } = require('./package.json')

//引入模块联邦的插件
 const Mfp = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  publicPath:'http://localhost:4004/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new Mfp({
        filename: 'remoteEntry.js', //打包后的文件名
        name: 'app1', //全局唯一名称
        exposes: {
          "./Users": "./src/views/Users.vue", //暴露的模块
          "./Statistic":"./src/views/Statistic.vue"
        },
        shared: { //依赖的模块
          echarts: {
            singleton: true
          }
        } 
      })
    ]
  },
  devServer: {
    port: 4004,
    headers: {
      'Access-Control-Allow-Origin': '*' // 主应用获取子应用时跨域响应头
    }
  }
})
