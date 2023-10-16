const babel = require("@babel/core");
// const myPlugin = require("./plugin1");
const myPlugin2 = require("./plugin2");

// const code = "const i = 2 ** 3;";
const code = 'const greet = (name) => `Hello, ${name}!`;console.log(greet("World"));';

const result = babel.transform(code, {
  plugins: [myPlugin2],
});

console.log(result.code);
