#!/usr/bin/env node
const program = require("commander");

console.log("我是myvue init命令");

// console.log("myvue init process.argv---->", process.argv);

program.parse(process.argv);

console.log("myvue init process.pid---->", process.pid);
