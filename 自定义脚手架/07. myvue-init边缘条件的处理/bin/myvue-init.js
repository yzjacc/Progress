#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const path = require("path");
const home = require("user-home");
const tildify = require("tildify");
const inquirer = require("inquirer");
const exists = require("fs").existsSync;

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
const tmp = path.join(home, ".vue-templates", template.replace(/[\/:]/g, "-"));

console.log("home---->", home);

console.log("tmp---->", tmp);

console.log("tildify tmp---->", tildify(tmp));

if (program.offline) {
  console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`);
  template = tmp;
}

if (inPlace || exists(to)) {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: inPlace
          ? "Generate project in current directory?"
          : "Target directory exists. Continue?",
        name: "ok",
      },
    ])
    .then((answers) => {
      if (answers.ok) {
        // TODO生成项目
      }
    })
    .catch((error) => {
      console.log(chalk.red(error));
    });
} else {
  // TODO生成项目
}

// 下载模板并生成项目
// 使用本地缓存的模板直接生成项目
