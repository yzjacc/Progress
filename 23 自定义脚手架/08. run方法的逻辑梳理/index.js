const path = require("path");

const relativePath = path.relative(
  "/data/orandea/test",
  "/data/orandea/test/bbb"
);

console.log("relativePath--->", relativePath);

// console.log(process.argv);
