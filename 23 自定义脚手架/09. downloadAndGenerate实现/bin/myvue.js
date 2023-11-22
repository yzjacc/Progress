#!/usr/bin/env node

const program = require("commander");

program
  .version(require("../package.json").version)
  .usage("<command> [options]")
  .command("init", "generate a new project from templates")
  .command("list", "list available official templates");

program.parse(process.argv);
