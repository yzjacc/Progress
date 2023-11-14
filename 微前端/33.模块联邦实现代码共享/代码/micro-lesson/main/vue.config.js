const { defineConfig } = require('@vue/cli-service')

const Mfp = require('webpack').container.ModuleFederationPlugin;

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new Mfp({
        name: 'app2',
        remotes: {
          app1:"app1@http://localhost:4004/remoteEntry.js"
        },
        shared: { //依赖的模块
          echarts: {
            eager: true,
            singleton: true
          }
        } 
      })
    ]
  },
  devServer: {
    port: 3000
  }
})
