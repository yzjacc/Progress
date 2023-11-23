const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // 扩展 webpack 配置,使 webpages 加入编译
  chainWebpack: (config) => {
    config.module
      .rule("fonts")
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10000,
        name: "fonts/[name].[hash:8].[ext]",
      })
      .end();
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/assets/fonts",
            to: "fonts",
          },
        ],
      }),
    ],
  },
};
