const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

// 设置路径
const srcDir = path.resolve(__dirname, "src");
const outDir = path.resolve(__dirname, "dist");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

fs.readdir(srcDir, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (path.extname(file) === ".js") {
      const filePath = path.join(srcDir, file);
      const outputPath = path.join(outDir, file);

      const result = babel.transformFileSync(filePath, {
        presets: ["@babel/preset-env"],
      });

      fs.writeFileSync(outputPath, result.code);
    }
  });
});
