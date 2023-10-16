# Babel介绍

*Babel* 是一个编译器，主要用于将最新的 *JavaScript* 代码转化为向后兼容的代码，以便在老版本的浏览器或环境中运行。

例如，你可能在开发时使用了 *ES6、ES7* 或者更高级的 *JavaScript* 特性，但是有些浏览器可能并不支持这些新特性，这时就可以用 *Babel* 来将代码转化为 *ES5* 或者更早版本的 *JavaScript*，以确保代码能在多数浏览器中正常运行。

其次，*Babel* 更像是一个平台，它本身的核心功能就是解析代码到抽象语法树（*AST*），然后再将 *AST* 转回 *JavaScript* 代码。所有的语法转换（例如将 *ES6* 转化为 *ES5*）和功能添加（例如 *polyfills*）都是通过各种插件来实现的。这一点有点类似于前面我们学习 *CSS* 工具链时介绍的 *PostCSS*。

<img src="https://resource.duyiedu.com/xiejie/2023-07-27-012319.jpg" alt="16898300520841" style="zoom:50%;" />

*Babel* 官网：*https://babeljs.io/*

以下是 *Babel* 的一些主要功能：

- 语法转换：将新的 *JavaScript* 语法（如 *JSX，TypeScript，ES2015+* 特性等）转换为旧的 *ES5* 语法。

- 源码映射：在编译后的代码中添加源码映射，以方便调试。

- *Polyfills*：添加缺失的特性，如 *Promise，Symbol* 等，这称为 *polyfill*。*Babel* 提供了一个 *Polyfill* 功能，能自动引入所需的 *Polyfill*。这个功能通过 *core-js* 模块实现（*Babel v7.4.0* 之前使用的是 *@babel/polyfill*），可以模拟整个 *ES2015+* 环境。

> Array.prototype.includes 这个 API 是 ES2016 的新特性，但是一些旧的浏览器是不支持，像这种情况就需要通过 polyfill 天补充缺失的特性，polyfill 就是一段 JS 代码而已，polyfill 这段代码会去检查当前的浏览器是否支持该 API，如果不支持，polyfill 里面提供了该 API 的实现
>
> ```js
> if(!Array.prototype.includes){
>   Array.prototype.includes = function() {...}
> }
> ```

- 插件和预设：*Babel* 提供了大量的插件支持，你可以通过插件来使用特定的 *JavaScript* 特性。预设是一组插件的集合，例如，*@babel/preset-env* 会根据你的环境自动决定需要使用哪些插件。


在前端开发中，*Babel* 被广泛用于现代 *JavaScript* 项目，它能确保你的代码能在各种环境中运行，而不需要你手动处理各种浏览器和 *JavaScript* 版本的兼容性问题。



## Babel快速入门

新建一个项目 babel-demo，使用 pnpm init 进行一个初始化，之后安装依赖：

```bash
pnpm add --save-dev @babel/core @babel/cli @babel/preset-env
```

- @babel/core: 这个是 Babel 的核心包，提供了核心 API
- @babel/cli：该依赖提供 CLI 命令行工具
- @babel/preset-env：预设环境，Babel 在做代码转换的时候，是需要依赖插件的，但是会有一种情况，就需要的插件很多。所谓预设，指的就是内置了一组插件，这样我们只需要引入一个预设即可，不需要再挨着挨着引入众多的插件

在 src/index.js 中书写我们的测试代码：

```js
const greet = (name) => `Hello, ${name}!`;
console.log(greet("World"));
```

接下来在项目的根目录下创建 .babelrc 配置文件，书写如下的配置：

```js
{
  "presets": ["@babel/preset-env"]
}
```

该配置就是指定我们的预设是什么。



之后在 package.json 里面添加 script 脚本命令

```js
"scripts": {
    // ...
    "babel": "babel src --out-dir lib"
},
```

编译 src 目录下的文件，输出到 lib 目录下面。

编译结果如下：

```js
"use strict";

var greet = function greet(name) {
  return "Hello, ".concat(name, "!");
};
console.log(greet("World"));
```



之后我们修改配置文件，指定了浏览器范围：

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

这一次编译出来的结果如下：

```js
"use strict";

const greet = name => "Hello, ".concat(name, "!");
console.log(greet("World"));
```



为什么两次不一样呢？原因很简单，第二次我们指定了浏览器版本范围，那么在指定的浏览器版本范围里面的这些浏览器，某一些特性已经支持了，所以就不需要再做转换了。