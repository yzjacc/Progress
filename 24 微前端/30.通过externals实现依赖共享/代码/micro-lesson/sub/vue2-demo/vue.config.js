const { defineConfig } = require('@vue/cli-service')
const {name} = require('./package.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  configureWebpack:{
    output:{
      library:`${name}-[name]`,
      libraryTarget:'umd',// 把子应用打包成 umd 库格式,所有模块定义下都能运行
      chunkLoadingGlobal:`webpackJsonp_${name}`, //webpack5中jsonpFunction已经被删除，使用chunkLoadingGlobal
    },
    plugins:[
      new BundleAnalyzerPlugin()
    ],
    externals: {
      'element-ui': 'ELEMENT',
      'vue':'Vue',
      'vue-router':'VueRouter',
    }
  },
  devServer: {
    port: 4001,
    headers: {
      'Access-Control-Allow-Origin': '*', //允许跨域
    }
  }
})
