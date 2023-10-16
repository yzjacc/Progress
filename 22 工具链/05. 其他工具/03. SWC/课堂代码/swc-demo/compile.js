const swc = require("@swc/core");
const fs = require("fs");
const path = require("path");

// 拼接路径
const codePath = path.resolve("src", "index.js");
const sourceCode = fs.readFileSync(codePath, "utf8");
const outDir = path.resolve(__dirname, "dist");

swc
  .transform(sourceCode, {
    jsc: {
      target: "es5", // 设置目标JavaScript版本
      parser: {
        syntax: "ecmascript", // 设置源代码的语法
      },
    },
  })
  .then((res) => {
    // console.log(res.code)
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    const outputFilePath = path.join(outDir, "index.js");
    fs.writeFileSync(outputFilePath, res.code);
  })
  .catch((err) => {
    console.error(err);
  });
