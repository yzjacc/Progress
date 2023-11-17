/*
 * @Author: 崔浩然
 * @Date: 2023-06-21 17:13:58
 * @Description: 页面/组件/功能的描述
 * @FilePath: /my-cli/lib/logger.js
 */
const chalk = require("chalk");

exports.fotal = function (error) {
  console.log(chalk.red(error));
  // 退出进程
  process.exit(1);
};

exports.log = function (message) {
  console.log(message);
};
