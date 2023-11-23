// 现在 b 这个包里面的文件想要用 a 包里面的内容
const {name} = require('a');
console.log(name);