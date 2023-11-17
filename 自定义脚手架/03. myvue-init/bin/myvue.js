#!/usr/bin/env node

console.log("我是myvue主命令");

const program = require("commander");

program
  .version(require("../package.json").version)
  .usage("<command> [options]")
  .command("init", "generate a new project from templates")
  .command("list", "list available official templates");

program.parse(process.argv);
