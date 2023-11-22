#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const path = require("path");
const home = require("user-home");
const tildify = require("tildify");
const inquirer = require("inquirer");
const exists = require("fs").existsSync;
const localPath = require("../lib/local-path");

const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;

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
        run();
      }
    })
    .catch((error) => {
      console.log(chalk.red(error));
    });
} else {
  run();
}

function run() {
  if (isLocalPath(template)) {
    // 使用本地缓存的模板生成项目
    console.log("使用本地缓存的模板生成项目");
    const templatePath = getTemplatePath(template);

    if (exists(templatePath)) {
      // 生成项目
      console.log("本地目录存在，直接生成项目");
      generate();
    } else {
      console.log(
        `${chalk.red("myvue-cli")} · Local template "${templatePath}" not found`
      );
    }
  } else {
    // 下载模板并生成项目
    if (hasSlash) {
      // github自定义模板生成项目
      console.log("github自定义模板生成项目");
      downloadAndGenerate(template);
    } else {
      // 官方模板生成项目
      console.log("官方模板生成项目");
      const officialTemplate = "vuejs-templates/" + template;
      downloadAndGenerate(officialTemplate);
    }
  }
}

// 下载模板并生成项目
function downloadAndGenerate(template) {
  console.log("下载模板并生成项目");
  console.log("假设已经下载完模板");
  generate();
}
// 生成项目
function generate() {
  console.log("生成项目");
}
