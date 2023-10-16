# Linter介绍

从这一章我们进入到 *ESLint* 的学习。

## *linter* 发展史

首先和大家来聊一聊关于 *linter* 的发展史。

### 静态代码分析

早在 *1978* 年，*Stephen C. Johnson* 在 *Debug* 自己的 *C* 语言项目时，突然想到为什么不做一个工具来提示自己写的代码哪里有问题呢？ 这个工具也被称为 *Linter*。

*Linter* 本意指的是衣服上多出来的小球、绒毛和纤维等，如果你刚把晾晒好的衣服收下来就会发现这些小玩意。以前如果想把这些多出来的“残渣”去掉，最简单的方法就是找一个单面胶粘一下再撕开，后来有的人发明了这个神器，一滚就能清除掉：

<img src="https://resource.duyiedu.com/xiejie/2023-07-19-015432.jpg" alt="16890781053129" style="zoom:50%;" />

这就是 *Linter* 的由来，不过区别是神器重点在 “清除”，而 *Linter* 重点在 “上报错误”。

*Linter* 想要提示错误，那首先就得阅读代码，这也是为什么 *Linter* 也被称为静态代码分析的工具。阅读完之后，再加上我们人为自定义好的一些规则，那么 *Linter* 就拥有了提示错误的能力了。

### *JSLint*

在 *2002* 年，*Douglas Crockfor*d 就为 *JavaScript* 写了第一个 *Linter* 工具：*JSLint*。

<img src="https://resource.duyiedu.com/xiejie/2023-07-19-015456.jpg" alt="16890782693589" style="zoom:50%;" />

你现在也可以在[这个网站](https://www.jslint.com/)上粘贴你的 *JavaScript* 代码来检查有没有问题。

*JSLint* 的优点就是 <u>开箱即用，不需要配置太多的东西，相当于拎包入住</u>。但优点也是缺点，就是 <u>规则太严格，完全不可扩展和自定义配置，连配置文件都没有</u>。

### *JSHint*

在 *JSLint* 的基础上，在 *2010* 年的时候 *Anton Kovalyov* 跟其它人就 *fork* 了一份  *JSLint* 然后改造成了 *JSHint*。

你可以在[这个网站](https://jshint.com/)访问到 *JSHint*

![16890785577272](https://resource.duyiedu.com/xiejie/2023-07-19-015521.jpg)

这个工具与 *JSLint* 的思路正好相反，它的默认规则非常松散，自由度非常高。但是也同样带来了问题：你需要非常了解这些规则才能配出一个好用的规则表。因为规则太不严格，过于自由，所以单纯靠默认的规则跟没有配置 *Linter* 一样。

### *JSCS*

前面的 *JSLint* 和 *JSHint* 主要功能都是检查代码质量问题的，*JSCS* (*JavaScript Coding Style*) 则是一个代码风格检查器。

它有超过 *90* 条规则，你也能自己创建规则，不过这些规则主要是和代码风格、代码格式化有关，它不会报任何和 *JS* 代码质量相关的错误。

<img src="https://resource.duyiedu.com/xiejie/2023-07-19-015539.jpg" alt="16890788653226" style="zoom: 33%;" />

尽管 *JSCS* 在其活跃时期非常受欢迎，但它已于 *2016* 年被宣布停止维护，并建议用户迁移到 *ESLint*。*ESLint* 是一个更强大、更灵活的工具，它不仅可以检查代码风格，还可以发现潜在的错误和代码质量问题。另一个流行的代码格式化工具是 *Prettier*，它专注于自动格式化代码，而不提供任何代码质量检查。

虽然 *JSCS* 不再被维护，但它的一些功能和理念已经被 *ESLint* 和 *Prettier* 等现代工具所采纳。如果你正在寻找一个代码风格检查器和格式化器，建议使用 *ESLint* 和 *Prettier* 来替代 JSCS。这两个工具可以很好地协同工作，*ESLint* 负责检查代码质量，而 *Prettier* 负责自动格式化。

### *ESLint*

接下来就是我们的主角 *ESLint* 了。

*2013* 年，一个叫 *JSChecker* 的小项目被改名成我们如今非常熟悉的 *ESLint*。

*ES6* 上线了之后，*JSHint* 受不了直接投降了，因为它不支持这些 *ES6* 新语法。而 *ESLint* 正好异军突起，马上用 *Esprima* （一个高性能的 *ECMAScript parser*）支持所有 *ES6* 新语法，并对新语法做好了校验。

除了基础的 *ES6* 代码质量校验，*ESLint* 还支持代码风格的规则。开发者不仅可以自定义项目要用哪些规则，也能直接无脑使用社区上制定的规则（比如 *eslint-config-airbnb*）。

<img src="https://resource.duyiedu.com/xiejie/2023-07-19-015617.jpg" alt="16890792201365" style="zoom: 33%;" />

这一波操作也让 *ESLint* 成为现在 *JavaScript* 的一个标准的 *Linter* 了。然而，关于 *Linter* 的故事还没结束。

*2012* 年微软公布了第一版的 *TypeScript*，随之而来的还有一个叫 *TSLint* 的 *Linter*。

在那段时间里，*TSLint* 是 *TypeScript* 的标准 *Linter* 工具，*ESLint* 则为 *JavaScript* 标准 *Linter*。它们各有自身特色：*ESLint* 有 *TSLint* 所没有的一些语法特性支持，而 *TSLint* 可以对代码进行静态分析和类型检查。

可是，一份代码还要两个 *Linter* 并行检查属实有点让人不爽。*TSLint* 也经常和 *ESLint* 的人探讨应该用哪个作为主力 *Linter*。*TS* 的社区也有很多声音希望优先满足 *JSer* 的需求，毕竟 *TS* 是 *JS* 的超集嘛，还是以 *ESLint* 为主。

最终，在 *2019* 年 *TSLint* 宣告不再维护，以后就是 *ESLint* 的天下了。

<img src="https://resource.duyiedu.com/xiejie/2023-07-19-015642.jpg" alt="16890792747878" style="zoom:33%;" />

## *ESLint* 核心概念

接下来我们来了解一下 *ESLint* 的核心概念，这个部分很重要，因为我们后期的学习就是围绕着这几个方面展开的。

*ESLint* 的核心概念包括以下几点：

1. 规则 (*Rules*)：规则是 *ESLint* 的核心，它们是独立的脚本，用于检查代码中的特定问题。*ESLint* 有许多内置规则，这些规则可以覆盖各种编码风格和潜在错误。规则是可配置的，每个规则可以被启用或禁用，并可以设置为警告或错误级别。

2. 配置 (*Configuration*)：*ESLint* 允许通过配置文件自定义规则的启用和设置。配置文件可以是 .*eslintrc*.* 格式的文件或 *package.json* 文件里的 *eslintConfig* 字段。配置可以继承其他配置，这使得可以轻松地共享和组合规则集。共享配置通常是一个 *npm* 包，可以被多个项目使用。

3. 插件 (*Plugins*)：插件是可扩展 *ESLint* 功能的方式，它们包含一组自定义规则和/或处理器（见下文）。这使得 *ESLint* 可以适应不同的编码风格和技术栈。插件可以通过 *npm* 安装并在配置文件中引用。

4. 处理器 (*Processors*)：处理器是一个可选的插件特性，它可以对非 *JavaScript* 文件进行预处理，以便 *ESLint* 可以检查这些文件中嵌入的 *JavaScript* 代码。例如，*HTML* 文件中的 \<*script*> 标签或 *Markdown* 文件中的代码块。

5. 命令行接口 (*CLI*)：*ESLint* 提供了一个命令行接口，用于在终端中执行 *linting* 操作。*CLI* 允许用户指定一个或多个文件、目录或 *glob* 模式以进行检查。*CLI* 还支持许多选项，这些选项可以覆盖配置文件中的设置，如禁用特定规则、规定输出格式等。



## ESLint 快速上手

首先创建一个 eslint-demo 的项目，使用 pnpm init 进行格式化，安装 eslint

```bash
pnpm add eslint -D
```

接下来在项目根目录下面创建一个 src/index.js，代码如下：

```js
const hello = "world";
console.log(hello);

function sayHello(name) {
  console.log("Hello, " + name + "!");
}

sayHello("world");
```

上面随便写了一些代码，接下来在项目根目录下面创建一个 eslint 的配置文件 .eslintrc，里面会书写一些配置信息：

```js
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

- env：主要是定义预设的全局变量
  - browser：这份配置适用于浏览器环境，预定义了诸如 window、document 之类的浏览器才会有的全局变量
  - es2021: 表示我们使用的是 ES 2021 的标准，肯定会预定义一些新版本的全局变量，Promise、Symbol 这些全局变量是支持的

- extends：这里我们所设置的值为 eslint:recommended，这其实是 ESLint 团队推荐的一组核心规则，你可以将其视为最佳实践
- parserOptions：和解析器相关的配置
  - ecmaVersion：使用的 ECMAScript 的版本，12 也就是 2021
  - sourceType：模块类型，这里设置为 module，表示我们使用的 ESM 模块规则，支持 import 和 export 语法
- rules：定义代码风格，功能类似于 prettier
  - indent：缩进，我们这里设置的是两个空格，如果不符合要求，会报 error 类型的错误
  - quotes：引号的设置，这里我们设置的是单引号，如果不符合要求，会报 error 类型的错误
  - semi：每一条语句添加分号，如果不符合要求，会报 error 类型的错误



最后修改 package.json，添加如下的 script 脚本命令：

```js
"scripts": {
    // ...
    "lint": "eslint ."
},
```

上面的脚本命令表示对当前项目所有的 js 文件进行 lint 检查。

使用 ESlint 进行代码检查的时候，是支持自动修复的，但是并非所有的错误都能够自动修复，只能够修复一部分。

要自动进行修复，只需要添加命令行参数 --fix 即可

```js
"scripts": {
    // ...
    "lint": "eslint --fix ."
},
```

