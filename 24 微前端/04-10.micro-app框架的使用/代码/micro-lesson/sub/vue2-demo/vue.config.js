const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  devServer: {
    port: 4001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: { //设置代理
      "/api": { 
          target: "http://localhost:3002", 
          changeOrigin: true,
          pathRewrite: {
              "^/api": "" 
          }
      }
  }
  }
})
