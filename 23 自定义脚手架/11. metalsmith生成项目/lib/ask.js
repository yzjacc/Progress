/*
 * @Author: 崔浩然
 * @Date: 2023-06-25 15:40:04
 * @Description: 页面/组件/功能的描述
 * @FilePath: /my-cli/lib/ask.js
 */
const inquirer = require("inquirer");
const async = require("async");

const promptMapping = {
  string: "input",
  boolean: "confirm",
};

module.exports = function ask(prompts, data, done) {
  // console.log("prompts ---->", prompts);
  // console.log("metadata ---->", data);
  async.eachSeries(
    Object.keys(prompts),
    (key, next) => {
      // 执行用户交互，询问
      // console.log("key---->", key);
      prompt(data, key, prompts[key], next);
    },
    done
  );
};

function prompt(data, key, prompt, next) {
  // 主要逻辑
  inquirer
    .prompt([
      {
        type: promptMapping[prompt.type] || prompt.type,
        name: key,
        message: prompt.message,
        default: prompt.default,
        choices: prompt.choices || [],
        validate: prompt.validate || (() => true),
      },
    ])
    .then((answers) => {
      if (Array.isArray(answers[key])) {
        data[key] = {};
        answers[key].forEach((multiChoiceAnswer) => {
          data[key][multiChoiceAnswer] = true;
        });
      } else if (typeof answers[key] === "string") {
        data[key] = answers[key].replace(/"/g, '\\"');
      } else {
        data[key] = answers[key];
      }
      next();
    })
    .catch(next);
}
