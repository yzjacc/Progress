const babel = require("@babel/core");

const options = {
  filename: "./src/myFile.js",
};

const config = babel.loadOptions(options);

console.log(config);
