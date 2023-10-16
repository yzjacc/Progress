#!/usr/bin/env node

// 上面的第一行代码，通常称之为 shebang（sharp bang）
// 这个是在类 unix 操作系统里面所支持的一种特性，用于高速系统如何执行之后的脚本
// 因此在 #！ 后面一般会跟上一个解释器的绝对路径

const prettier = require("prettier");
const fs = require("fs");
const path = require("path");


// 获取命令行参数
const args = process.argv.slice(2);

// 要做格式化的操作
// pnpm formattool --write src/index.js

// 读取源码
const sourcePath = path.resolve("src", "index.js");
const jsSource = fs.readFileSync(sourcePath, "utf8");

// 读取配置文件
const options = JSON.parse(fs.readFileSync(path.resolve(".prettierrc")));

if(args.length === 0){
    console.error("请提供一个参数！");
    process.exit(1);
}

const input = args[0];

if(input === "--write" || input === "-w"){
    // 使用 prettier 的 api 对代码进行格式化操作
    prettier.format(jsSource, options).then(res=>{
        // 将格式化后的 js 代码重新写回到原来的文件
        fs.writeFileSync(sourcePath, res, 'utf-8');
    })
    console.log("格式化操作已经完成...");
}