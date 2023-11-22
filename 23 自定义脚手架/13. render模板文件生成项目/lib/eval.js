/*
 * @Author: 崔浩然
 * @Date: 2023-06-25 16:56:47
 * @Description: 页面/组件/功能的描述
 * @FilePath: /my-cli/lib/eval.js
 */
const chalk = require("chalk");

module.exports = function evaluate(exp, data) {
  const fn = new Function("data", "with (data) { return " + exp + "}");
  try {
    return fn(data);
  } catch (e) {
    console.error(chalk.red("Error when evaluating filter condition: " + exp));
  }
};
