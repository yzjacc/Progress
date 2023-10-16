// 判断 src 下面是否所有的文件都已经格式化

const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

// 书写 prettier 规则配置
const options = {
  singleQuote: false,
  printWidth: 50,
  semi: false,
  trailingComma: "es5",
  parser: "babel",
};

fs.readdir("src", async (err, files) => {
  if (err) throw err;

  let isAllFormated = true;
  for (let i = 0; i < files.length; i++) {
    // 拼接路径
    const sourcePath = path.resolve("src", files[i]);

    // 读取源码文件
    const jsSource = fs.readFileSync(sourcePath, "utf8");

    const res = await prettier.check(jsSource, options);

    if (!res) {
      // 说明这个文件没有被格式化
      console.log(`${files[i]} 文件还没有格式化`);
      isAllFormated = false;
    }
  }
  if (isAllFormated) {
    console.log("所有文件都已经格式化...");
  }
});
