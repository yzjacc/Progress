// postcss 配置主要其实就是做插件的配置

module.exports = {
  plugins: [
    require("stylelint")({
      fix: true
    }),
    require("autoprefixer"),
    // require("cssnano")
  ],
};
