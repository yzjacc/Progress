const path = require("path");
const { lintFiles } = require("./eslint-integration");

// 拼接要做 lint 检查的文件路径
const sourcePath = path.resolve("src", "index.js");

lintFiles(sourcePath);