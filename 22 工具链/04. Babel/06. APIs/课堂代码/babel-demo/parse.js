const babel = require("@babel/core");

const code =
  'const greet = (name) => `Hello, ${name}!`;console.log(greet("World"));';


  babel.parse(code,(err, ast)=>{
    if (err) throw err;

    console.log(JSON.stringify(ast, null, 2));
  })