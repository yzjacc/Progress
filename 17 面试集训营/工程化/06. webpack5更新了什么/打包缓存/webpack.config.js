const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  cache: {
    type: 'filesystem', // 缓存类型，支持：memory、filesystem
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'), // 缓存目录，仅类型为 filesystem 有效
    // 更多配置参考：https://webpack.docschina.org/configuration/other-options/#cache
  },
};
