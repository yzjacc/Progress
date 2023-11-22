const chalk = require("chalk");

exports.fotal = function (error) {
  console.log(chalk.red(error));
  // 退出进程
  process.exit(1);
};
