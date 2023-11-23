module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  experiments: {
    topLevelAwait: true,
  },
};
