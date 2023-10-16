# postcss-cli和配置文件

- postcss-cli
- 配置文件



## postcss-cli

cli 是一组单词的缩写（command line interface），为你提供了一组在命令行中可以操作的命令来进行处理。

postcss-cli 通过给我们提供一些命令行的命令来简化 postcss 的使用。

首先第一步还是安装：

```bash
pnpm add postcss-cli -D
```

安装完成后，我们就可以通过 postcss-cli 所提供的命令来进行文件的编译操作，在 package.json 里面添加如下的脚本：

```json
"scripts": {
  	...
    "build": "postcss src/index.css -o ./build.css"
},
```

- -o：表示编译后的输出文件，编译后的文件默认是带有源码映射。
- --no-map：不需要源码映射
- --watch：用于做文件变化的监听工作，当文件有变化的时候，会自动重新执行命令。注意如果使用了 --watch 来做源码文件变化的监听工作，那么一般建议把编辑器的自动保存功能关闭掉

关于 postcss-cli 这个命令行工具还提供了哪些命令以及哪些配置项目，可以参阅：https://www.npmjs.com/package/postcss-cli



## 配置文件

一般我们会把插件的配置书写到配置文件里面，在配置文件里面，我们就可以指定使用哪些插件，以及插件具体的配置选项。

要使用配置文件功能，可以在项目的根目录下面创建一个名为 postcss.config.js 的文件，当你使用 postcss-cli 或者构建工具（webpack、vite）来进行集成的时候，postcss 会自动加载配置文件。

在 postcss.config.js 文件中书写如下的配置：

```js
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: "last 10 versions",
    }),
  ],
};
```

postcss 配置文件最主要的其实就是做插件的配置。postcss 官网没有提供配置文件相关的文档，但是我们可以在：https://github.com/postcss/postcss-load-config 这个地方看到 postcss 配置文件所支持的配置项目。

接下来我们来看一个 postcss 配置文件具体支持的配置项目：

1. plugins：一个数组，里面包含要使用到的 postcss 的插件以及相关的插件配置。

```js
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({ preset: "default" }),
  ],
};
```

2. map：是否生成源码映射，对应的值为一个对象

```js
module.exports = {
  map: { inline: false },
  plugins: [/* Your plugins here */],
};
```

默认值为 false，因为源码映射一般是会单独存放在一个文件里面。

3. syntax：用于指定 postcss 应该使用的 CSS 语法，默认情况下 postcss 处理的是标准的 CSS，但是有可能你的 CSS 是使用预处理器来写的，这个时候 postcss 是不认识的，所以这个时候需要安装对应的插件并且在配置中指明 syntax

```js
module.exports = {
  syntax: "postcss-scss",
  plugins: [/* Your plugins here */],
};
```

安装postcss-scss这个插件，并且在配置文件中指定 syntax 为 postcss-scss，之后 PostCSS 就能够认识你的 sass 语法。

4. parser：配置自定义解析器。Postcss 默认的解析器为 postcss-safe-parser，负责将 CSS 字符串解析为 CSS AST，如果你要用其他的解析器，那么可以配置一下

```js
const customParser = require("my-custom-parser");

module.exports = {
  parser: customParser,
  plugins: [/* Your plugins here */],
};
```

5. stringifier：自定义字符串化器。用于将 CSS AST 转回 CSS 字符串。如果你要使用其他的字符串化器，那么也是可以在配置文件中国呢进行指定的。

```js
const customStringifier = require("my-custom-stringifier");

module.exports = {
  stringifier: customStringifier,
  plugins: [/* Your plugins here */],
};
```

最后还剩下两个配置项：from、to，这两个选项官方是不建议你配置的，而且你配置的大概率还会报错，报错信息如下：

> Config Error: Can not set from or to options in config file, use CLI arguments instead

这个提示的意思是让我们不要在配置文件里面进行配置，而是通过命令行参数的形式来指定。

至于为什么，官方其实解释得很清楚了：

>*In most cases options.from && options.to are set by the third-party which integrates this package (CLI, gulp, webpack). It's unlikely one needs to set/use options.from && options.to within a config file.*

因为在实际开发中，我们更多的是会使用构建工具（webpack、vite），这些工具会去指定入口文件和出口文件。

