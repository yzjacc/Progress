// 对源码进行压缩

const { minify } = require("terser");
const path = require("path");
const fs = require("fs");

// 定义输入和输出文件的路径
const codePath = path.resolve("src", "index.js");
const outDir = "dist";
const outPath = path.resolve(outDir, "index.js");
const outSourcemapPath = path.resolve(outDir, "index.js.map");

// 读取源码文件
const code = {
  "index.js": fs.readFileSync(codePath, "utf8"),
};

// 压缩对应的配置项
const options = {
  sourceMap: {
    filename: "index.js",
    url: "index.js.map",
  },
};

// 准备工作完成后，接下来就调用 API 进行压缩
minify(code, options)
  .then((result) => {
    // console.log(result)
    // 将压缩后的内容写入到规定的位置
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outPath, result.code);

    // 生成 sourcemap
    if (result.map) {
      fs.writeFileSync(outSourcemapPath, result.map);
    }

    console.log("压缩工作已完成...");
  })
  .catch((err) => {
    console.log("压缩工作失败，错误信息如下：");
    console.error(err);
  });
