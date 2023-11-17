#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const path = require("path");

program
  .usage("<template-name> [project-name]")
  .option("-c, --clone", "use git clone")
  .option("--offline", "use catched template");

/**
 * Help
 */
program.on("--help", () => {
  console.log("  Examples:");
  console.log();
  console.log(
    chalk.gray("    # create a new project with an official template")
  );
  console.log("    $ vue init webpack my-project");
  console.log();
  console.log(
    chalk.gray("    # create a new project straight from a github template")
  );
  console.log("    $ vue init username/repo my-project");
  console.log();
});

// process.argv.slice(2)

function help() {
  program.parse(process.argv);
  if (program.args.length < 1) {
    return program.help();
  }
}

help();

let template = program.args[0]; // 模板名称
const hasSlash = template.indexOf("/") > -1; // 判断template参数是否存在 "/"
const rawName = program.args[1]; // 第二个参数
const inPlace = !rawName || rawName === "."; // 是否在当前目录下生成项目
const name = inPlace ? path.relative("../", process.cwd()) : rawName; // 根据inPlace得到项目名
const to = path.resolve(rawName || "."); // 生成项目的绝对路径
const clone = program.clone || false;

console.log("program.clone---->", program.clone);
console.log("program.offline---->", program.offline);
console.log("clone---->", clone);

if (program.offline) {
  console.log("use catched template");
}

console.log("template---->", template);
console.log("rawName---->", rawName);
console.log("to---->", to);

console.log(" process.cwd()---->", process.cwd());

// 下载模板并生成项目

// TODO  download template and generate project
