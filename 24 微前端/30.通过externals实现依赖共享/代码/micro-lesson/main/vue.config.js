const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    port: 3000
  },
  configureWebpack:{
    externals: {
      'element-ui': 'ELEMENT',
      'vue':'Vue',
      'vue-router':'VueRouter',
    }
  },
})
