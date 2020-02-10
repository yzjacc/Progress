const path = require('path');

// vue add style-resources-loader

module.exports = {
  // 是否打包sourcemap
  productionSourceMap: false,

  // 设置输出目录
  outputDir: './myDist',
  
  //设置相对路径目录
  publicPath: process.env.NODE_ENV === 'production' ? 'http://www.duyiedu.com' : '/',
  
  //静态资源路径
  assetsDir: 'assets',
  
  //添加webpack设置
  //添加别名
  chainWebpack: config => {
    config.resolve.alias.set('_v', path.resolve(__dirname, 'src/views'))
  },

  //配置webpack
  configureWebpack: {
    // plugin: [],
    // module: {}
  },

  //设置代理网址
  devServer: {
    proxy: 'http://api.duyiedu.com'
    // proxy: {
    //   '/api/chat/sendMsg': {
    //     target: 'http://api.duyiedu.com'
    //   }
    // }
  },
  
  //设置全局less
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/variable.less')
      ]
    }
  }
}
