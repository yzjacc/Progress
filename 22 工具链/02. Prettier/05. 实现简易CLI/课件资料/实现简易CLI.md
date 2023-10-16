# 实现简易 CLI

一个工具的 CLI 背后其实就是调用的对应的 API，所以我们这里来实现一个简易的 CLI 工具。

首先新建一个名为 formattool 项目，使用 pnpm init 进行初始化。然后在项目中新建一个 index.js，代码如下：

```js
#!/usr/bin/env node

// 上面的第一行代码，通常称之为 shebang（sharp bang）
// 这个是在类 unix 操作系统里面所支持的一种特性，用于告诉系统如何执行之后的脚本
// 因此在 #！ 后面一般会跟上一个解释器的绝对路径

// 获取命令行参数
const args = process.argv.slice(2);

console.log(args);
```

主要就是要注意第一行代码，该代码是类Unix（Linux、MacOS）操作系统所拥有的一种特性，告诉操作系统如何执行之后的脚本，后面会跟上解释器的绝对路径。

接下来我要进行一个全局的链接。

终端定位到在 formattool 项目根目录下，使用 npm link 进行一个全局的链接，接下来回到要链接的项目（prettier-demo），使用 npm link formattool 链接刚才放到了全局下面的包。

接下来回到 formattool 下面的 index.js 文件中，补充如下的代码：

```js
#!/usr/bin/env node

// 上面的第一行代码，通常称之为 shebang（sharp bang）
// 这个是在类 unix 操作系统里面所支持的一种特性，用于高速系统如何执行之后的脚本
// 因此在 #！ 后面一般会跟上一个解释器的绝对路径

const prettier = require("prettier");
const fs = require("fs");
const path = require("path");


// 获取命令行参数
const args = process.argv.slice(2);

// 要做格式化的操作
// pnpm formattool --write src/index.js

// 读取源码
const sourcePath = path.resolve("src", "index.js");
const jsSource = fs.readFileSync(sourcePath, "utf8");

// 读取配置文件
const options = JSON.parse(fs.readFileSync(path.resolve(".prettierrc")));

if(args.length === 0){
    console.error("请提供一个参数！");
    process.exit(1);
}

const input = args[0];

if(input === "--write" || input === "-w"){
    // 使用 prettier 的 api 对代码进行格式化操作
    prettier.format(jsSource, options).then(res=>{
        // 将格式化后的 js 代码重新写回到原来的文件
        fs.writeFileSync(sourcePath, res, 'utf-8');
    })
    console.log("格式化操作已经完成...");
}
```

在上面的代码中，我们调用了 prettier 的 format 方法来对 src/index.js 文件进行一个格式化，并且将格式化后的代码写回到原来的文件。

之后在 prettier-demo 项目中，我们需要在 package.json 中添加一条命令：

```js
"scripts": {
    // ...
    "formattool": "formattool"
},
```

之后我们就可以在控制台通过 pnpm formatool --write 对 src/index.js 文件进行格式化操作。



注意，我们上面所完成的代码只是一个最最基本的演示，目的是为了让大家明白 CLI 背后的原理其实就是获取用户在命令行所输入的参数，然后调用对应的 API。实际的 CLI 背后还会有更多的判断。

