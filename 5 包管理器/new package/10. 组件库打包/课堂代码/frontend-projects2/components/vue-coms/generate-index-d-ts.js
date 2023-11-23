// 该文件的主要作用是生成一个类型说明文件的入口文件
// 这里涉及到 node.js 的知识
// 主要就是读取文件和写入文件

const fs = require("fs");
const path = require("path");

const typesDir = path.resolve(__dirname, "dist/types");
const indexDtsPath = path.join(typesDir, "index.d.ts");

// 从 `dist/types` 目录中读取所有 `.d.ts` 文件
fs.readdir(typesDir, (err, files) => {
  if (err) {
    console.error("Error reading types directory:", err);
    process.exit(1);
  }

  const dtsFiles = files.filter(
    (file) => file.endsWith(".d.ts") && file !== "index.d.ts"
  );

  // 为每个 `.d.ts` 文件创建一个导出语句
  const exports = dtsFiles
    .map((file) => `export * from './${file}';`)
    .join("\n");

  // 定义 index.d.ts 文件内容
  const indexDtsContent = `import { Plugin } from "vue";

declare const vuecoms: Plugin;
export default vuecoms;

${exports}
`;

  // 将内容写入 `index.d.ts` 文件
  fs.writeFile(indexDtsPath, indexDtsContent, (err) => {
    if (err) {
      console.error("Error writing index.d.ts:", err);
      process.exit(1);
    }

    console.log("index.d.ts generated successfully.");
  });
});
