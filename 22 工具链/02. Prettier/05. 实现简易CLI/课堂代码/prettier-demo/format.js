// 该文件使用 API 的形式来对代码进行格式化

const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

// prettier.format(source, options)

// console.log(sourcePath);
// /Users/jie/Desktop/prettier-demo/src/index.js

const optionsPath = path.resolve(".prettierrc");

// 书写 prettier 规则配置
// const options = {
//   singleQuote: false,
//   printWidth: 50,
//   semi: false,
//   trailingComma: "es5",
//   parser: "babel",
// };

// 读取配置文件
const options = JSON.parse(fs.readFileSync(optionsPath,'utf-8'));


// 读取 src 目录
fs.readdir("src", (err, files) => {
  if (err) throw err;

  for (let i = 0; i < files.length; i++) {
    // 拼接路径
    const sourcePath = path.resolve("src", files[i]);

    // 读取源码文件
    const jsSource = fs.readFileSync(sourcePath, "utf8");

    // 使用 prettier.format 来进行格式化
    // 通过 API 的方式来格式化，一定要指定 parser
    prettier.format(jsSource, options).then((res) => {
      // 将格式化好的结果重新写入到原来的文件里面
      fs.writeFileSync(sourcePath, res, "utf-8");
    });
  }
  console.log("格式化完毕...");
});
