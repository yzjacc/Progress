# Terser

*Terser* 是一个流行的 *JavaScript* 解析器和压缩器，它可以帮助你优化 *JavaScript* 代码以减少其大小，从而提高 *web* 页面的加载速度。*Terser* 是 *Uglify-es* 的替代品，后者已经停止维护，*Terser* 支持 *ES6* 和更高版本的 *JavaScript*。

![16894736097494](https://resource.duyiedu.com/xiejie/2023-07-25-025458.jpg)

*Terser* 官网：*https://terser.org/*

以下是 *Terser* 的一些主要功能：

- 删除无用的代码：*Terser* 可以自动删除你的代码中的无用代码（也称为 "*dead code*"），例如未被调用的函数和未被使用的变量。

- 压缩和混淆代码：*Terser* 可以将你的代码压缩到尽可能小的大小。它可以移除空格和注释，将变量和函数名重命名为短的名称，以及使用其他的压缩技术。这也有助于混淆你的代码，使得它更难被人类理解，从而提高代码的安全性。

- 保留注释：虽然 *Terser* 默认会移除所有的注释，但你可以配置它保留某些注释，例如包含特定关键词的注释。

- 源码映射支持：*Terser* 支持生成源码映射（*source map*），这可以帮助你在压缩后的代码中进行调试。

- 支持 *ES6* 及更高版本：*Terser* 支持最新版本的 *JavaScript*，包括 *ES6、ES7、ES8* 等。



这一次我们在学习这个新工具的时候，我们就按照上一节课介绍的方式来学习：

- API
- CLI
- 配置文件



## API

首先创建一个项目 terser-demo，使用 pnpm init 进行一个初始化，安装相应的依赖：

```js
pnpm add terser -D
```

接下来在 src/index.js 文件里面写入了一些要压缩的代码，之后在 src 下面创建 compress.js，打算利用 terser 的 api 对文件进行压缩。

compress.js 的代码如下：

```js
// 对源码进行压缩

const { minify } = require("terser");
const path = require("path");
const fs = require("fs");

// 定义输入和输出文件的路径
const codePath = path.resolve("src", "index.js");
const outDir = "dist";
const outPath = path.resolve(outDir, "index.js");
const outSourcemapPath = path.resolve(outDir, "index.js.map");

// 读取源码文件
const code = {
  "index.js": fs.readFileSync(codePath, "utf8"),
};

// 压缩对应的配置项
const options = {
  sourceMap: {
    filename: "index.js",
    url: "index.js.map",
  },
};

// 准备工作完成后，接下来就调用 API 进行压缩
minify(code, options)
  .then((result) => {
    // console.log(result)
    // 将压缩后的内容写入到规定的位置
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outPath, result.code);

    // 生成 sourcemap
    if (result.map) {
      fs.writeFileSync(outSourcemapPath, result.map);
    }

    console.log("压缩工作已完成...");
  })
  .catch((err) => {
    console.log("压缩工作失败，错误信息如下：");
    console.error(err);
  });

```

在上面的代码中，我们用到了 terser 的 minify 这个方法来对代码进行压缩。其中关于 options 压缩配置对象这一块，可以在 https://terser.org/docs/api-reference/#minify-options-structure 看到能够配置的所有选项。

关于 terer 具体的 API，可以参阅官网：https://terser.org/docs/api-reference/



## CLI

CLI 部分背后调用的就是 API，在官网的 https://terser.org/docs/cli-usage/ 这个位置可以看到该工具所支持的 CLI

基本的格式如下：

```bash
terser [input files] [options]
```

- input files:要压缩的文件
- options：压缩配置项

例如：

```js
"scripts": {
    // ...
    "compress": "terser ./src/index.js -o ./dist/index.js --source-map -o ./dist/index.js"
 },
```



## 配置文件

terser 由于这个工具比较小，所以没有支持单独的配置文件，但是你要注意不支持单独的配置文件不代表不支持配置，作为一个工具，肯定是支持配置的。

你可以在 https://terser.org/docs/options/ 看到该工具所有的配置项。