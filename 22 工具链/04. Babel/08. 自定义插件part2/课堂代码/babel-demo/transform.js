const babel = require("@babel/core");

const code =
  'const greet = (name) => `Hello, ${name}!`;console.log(greet("World"));';

babel.transform(
  code,
  {
    presets: ["@babel/preset-env"],
  },
  function (err, result) {
    if (err) throw err;
    console.log(result.code);
  }
);
