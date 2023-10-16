# SWC

*SWC* 英文全称为 *Speedy Web Compiler*，翻译成中文为“快速网页编译器”。

官网地址：https://swc.rs/

<img src="https://resource.duyiedu.com/xiejie/2023-07-27-123733.jpg" alt="16894863108763" style="zoom: 45%;" />

来看一下官方的介绍：

>*SWC is an extensible Rust-based platform for the next generation of fast developer tools. It's used by tools like Next.js, Parcel, and Deno, as well as companies like Vercel, ByteDance, Tencent, Shopify, and more.*
>
>*SWC can be used for both compilation and bundling. For compilation, it takes JavaScript / TypeScript files using modern JavaScript features and outputs valid code that is supported by all major browsers.*


中文的意思就是：

*SWC* 是一个基于 *Rust* 的可扩展平台，用于下一代高速开发工具。它被 *Next.js、Parcel、Deno* 等工具，以及 *Vercel*、字节跳动、腾讯、*Shopify* 等公司广泛使用。

*SWC* 既可以用于编译，也可以用于打包。在编译方面，它接受使用现代 *JavaScript* 功能的 *JavaScript / TypeScript* 文件，并输出由所有主流浏览器支持的有效代码。

那么 *SWC* 的特点是什么呢？就一个特点：快。

看一看官方对于 *SWC* 速度的描述：

>*SWC is 20x faster than Babel on a single thread and 70x faster on four cores.*

也就是说，当只使用一个 *CPU* 核心（即单线程环境）时，*SWC* 比 *Babel* 快 *20* 倍。而当使用四个 *CPU* 核心（即四核环境，能够进行并行处理）时，*SWC* 比 *Babel* 快 *70* 倍。

没错，*SWC* 对标的就是 *Babel*，力图成为 *Babel* 的替代品。而 *SWC* 之所以可以那么快，主要是由于以下几个因素：

1. 编程语言：*SWC* 是用 *Rust* 语言编写的。*Rust* 是一种系统编程语言，它旨在提供内存安全性，无数据竞争，并且有着高效的性能。*Rust* 的执行速度通常比 *JavaScript* 快。

2. 并行处理：*Rust* 具有优秀的并行处理和并发能力。当在多核 *CPU* 上运行时，*SWC* 能够有效地利用这些核心并行执行任务，从而大大提高了处理速度。

3. 优化的设计：*SWC* 设计上对性能进行了优化。例如，它使用一次性遍历（*single-pass traversal*）来转换代码，这种方法比 *Babel* 使用的多次遍历更高效。

4. 跳过不必要的工作：与 *Babel* 不同，*SWC* 可以跳过一些不必要的工作，例如不需要生成和处理 *source maps*，除非明确需要。



早期各种前端工具都是基于 Node.js 来写的，Node.js 本身只是一个 JS 的运行时，JS 本身又是一门单线程解释语言，所以 JS 的运行速度不会比像 Rust、Go 这种语言快。

这几年开始就有一种趋势，用其他的编程语言来编写前端工具，甚至还专门出现了一个词语 rustification（锈化），就是指使用 rust 语言来翻新已有的前端工具，从而提升工具的性能。

- *SWC*：使用 *Rust* 编写的超快速的 *JavaScript/TypeScript* 编译器。它的目标是替代*Babel*。
- *Turbopack*：*Vercel* 声称这是 *Webpack* 的继任者，用 *Rust* 编写，在大型应用中，展示出了 *10* 倍于 *Vite*、*700* 倍于 *Webpack* 的速度。
- *esbuild*: *esbuild* 是由 *Go* 编写的构建打包工具，对标的是 *webpack、rollup* 和 *parcel* 等工具，在静态语言的加持下，*esbuild* 的构建速度可以是传统 *js* 构建工具的 *10-100* 倍，就好像跑车和自行车的区别。
- *Rome*： 是一个使用 *Rust* 编写的全栈工具链，它打算整合各种前端开发工具的功能，从而提供一个统一的、一体化的开发体验。*Rome* 的目标是替代或集成诸如 *Babel、ESLint、Webpack、Prettier、Jest* 等多个分散的工具。
- *Deno*： 是一个使用 *Rust* 和 *TypeScript* 编写的 *JavaScript/TypeScript* 运行时，它的目标是成为一个更安全、更高效的 *Node.js* 替代品。

虽然编写这些工具的语言发生了变化，但是我们使用这些工具的方法是没变的：

- API
- CLI
- 配置





## API

新建一个项目 swc-demo，使用 pnpm init 进行初始化，安装依赖

```bash
pnpm add @swc/core -D
```

接下来在 src/index.js 中书写测试代码：

```js
const greet = (name) => `Hello, ${name}!`;
console.log(greet("World"));
```



之后在项目根目录下创建 compile.js，在该文件中利用 swc 提供的 api 对文件进行编译

```js
const swc = require("@swc/core");
const fs = require("fs");
const path = require("path");

// 拼接路径
const codePath = path.resolve("src", "index.js");
const sourceCode = fs.readFileSync(codePath, "utf8");
const outDir = path.resolve(__dirname, "dist");

swc
  .transform(sourceCode, {
    jsc: {
      target: "es5", // 设置目标JavaScript版本
      parser: {
        syntax: "ecmascript", // 设置源代码的语法
      },
    },
  })
  .then((res) => {
    // console.log(res.code)
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    const outputFilePath = path.join(outDir, "index.js");
    fs.writeFileSync(outputFilePath, res.code);
  })
  .catch((err) => {
    console.error(err);
  });
```



## CLI

首先需要安装相应的 CLI 工具

```bash
pnpm add @swc/cli -D
```

之后就可以在 https://swc.rs/docs/usage/cli 看到 swc 所支持的所有的 CLI 命令

然后在 package.json 中进行 CLI 的配置即可，例如：

```js
"scripts": {
    // ...
    "swc": "swc src -d lib"
 },
```



## 配置

我们在使用 transform 方法的时候，第二个参数就是一个配置对象。

你可以在 https://swc.rs/docs/configuration/compilation 看到所有所支持的配置选项。

如果你没有配置文件，那么会有一个默认的配置设置：

```js
{
  //  这个配置项用于设置 JavaScript的 编译选项
  "jsc": {
    // 这个配置项用于设置解析器的选项
    "parser": {
      // 设置源代码的语法，可以是 ecmascript、jsx、typescript 或 tsx
      "syntax": "ecmascript",
      // 是否启用JSX语法
      "jsx": false,
      // 是否启用动态 import() 语句
      "dynamicImport": false,
      // 是否启用私有方法和访问器
      "privateMethod": false,
      // 是否启用函数绑定语法（::操作符）
      "functionBind": false,
      // 是否启用 export v from 'mod' 语法
      "exportDefaultFrom": false,
      // 是否启用 export * as ns from 'mod' 语法
      "exportNamespaceFrom": false,
      // 是否启用装饰器语法
      "decorators": false,
      // 是否在导出之前应用装饰器
      "decoratorsBeforeExport": false,
      // 是否启用顶级 await 语法
      "topLevelAwait": false,
      // 是否启用 import.meta 语法
      "importMeta": false,
      // 是否保留所有注释
      "preserveAllComments": false
    },
    // 设置转换插件，通常不需要手动设置
    "transform": null,
    // 设置目标 JavaScript 版本
    // 例如 es3、es5、es2015、es2016、es2017、es2018、es2019、es2020
    "target": "es5",
    // 是否启用宽松模式，这会使编译后的代码更简短，但可能不完全符合规范
    "loose": false,
    // 是否引用外部的 helper 函数，而不是内联它们
    "externalHelpers": false,
    // 是否保留类名，这需要版本 v1.2.50 或更高
    // 且 target 需要设置为 es2016 或更高
    "keepClassNames": false
  },
  // 这个配置项用于指示输入的源代码是否是模块代码。
  // 如果是，那么 import 和 export 语句将被正常处理
  // 否则，它们将被视为语法错误
  "isModule": false
}
```

