const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  devServer: {
    port: 8080,
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash:5][ext]', // 在这里自定义资源文件保存的文件名
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource', // 作用类似于 file-loader
      },
      {
        test: /\.jpg/,
        type: 'asset/inline', // 作用类似于 url-loader 文件大小不足的场景
      },
      {
        test: /\.txt/,
        type: 'asset/source', // 作用类似于 raw-loader
      },
      {
        test: /\.gif/,
        type: 'asset', // 作用类似于 url-loader。在导出一个 data uri 和发送一个单独的文件之间自动选择
        generator: {
          filename: 'gif/[hash:5][ext]', // 这里的配置会覆盖 assetModuleFilename
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb以下使用 data uri
          },
        },
      },
    ],
  },
};
