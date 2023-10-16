# 配置文件part2

首先再次强调，在我当前讲课的这个时间节点（2023.7.21），新版本的配置文件系统还没有正式生效，因为目前最新的版本为 v8.x.x，新版本的配置文件系统要到 v9.0.0 才正式生效。

这也意味着当前我们所介绍的内容，在未来还有变化的余地，如果之后看到课程内容和官方文档有所出入，以官方为准。



## 配置文件的书写

从 v9.0.0 开始，官方推荐的配置文件格式为 eslint.config.js，并且支持 ESM 模块化风格，可以通过 export default 来导出配置内容

```js
export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];
```

之所以导出的是一个数组，是因为为了支持项目中不同的文件或者文件类型定义不同的规则。

例如，你的项目里面既有 JS 代码，也有 TS 代码，你可能想要针对不同的代码类型配置不同的 ESLint 检查规则，这里就可以这样写：

```js
module.exports = [
  {
    files: ["*.js"],
    rules: {
      "no-var": "error"
    }
  },
  {
    files: ["*.ts"],
    rules: {
      "@typescript-eslint/no-var": "error"
    }
  }
];
```



如果你在 package.json 里面没有指定 type: module，那么就代表你使用的是 CommonJS 规范，那么 ESLint 配置文件在做模块导出的时候，也需要使用 CommonJS 模块规范

```js
module.exports = [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];
```



## 配置对象的选项

具体的配置选项如下：

- *files* - 一个含有 *glob* 模式的数组，指示应用配置对象的文件。如果未指定，配置对象应用于所有由任何其他配置对象匹配的文件。
- *ignores* - 一个含有 *glob* 模式的数组，指示配置对象不应用于的文件。如果未指定，配置对象应用于所有由 *files* 匹配的文件。
- *languageOptions* - 一个包含与 *JavaScript* 的 *lint* 设置有关的设置对象。。
    - *ecmaVersion* - 支持的 *ECMAScript* 版本。可能是任何年份（例如，*2022*）或版本（例如，*5*）。设置为 "*latest*" 表示最近支持的版本。（默认："*latest*"）
    - *sourceType* - *JavaScript* 源码的类型。可能的值为 "*script*" 表示传统脚本文件，"*module*" 表示 *ECMAScript* 模块（*ESM*），以及 "*commonjs*" 表示 *CommonJS* 文件。（默认情况下 "*module*" 对应 .*js* 和 .*mjs* 文件，"*commonjs*" 对应 .*cjs* 文件）
    - *globals* - 一个对象，指定在 *linting* 过程中应添加到全局作用域的额外对象。
    - *parser* - 包含 *parse*( ) 方法或 *parseForESLint*( ) 方法的对象。（默认值为 *espree*）
    - *parserOptions* - 一个对象，指定直接传递给 *parser* 上的 *parse*( ) 或 *parseForESLint*( ) 方法的额外选项。可用的选项依赖于解析器。
- *linterOptions* - 包含与 *linting* 相关配置的对象。
    - *noInlineConfig* - 布尔值，指示是否允许内联配置。
    - *reportUnusedDisableDirectives* - 布尔值，控制是否报告未使用的 *eslint-disable* 指令
- *processor* - 包含 *preprocess*( ) 和 *postprocess*( ) 方法的对象，或者指示插件内部处理器名称的字符串（例如，"*pluginName/processorName*"）。
- *plugins* - 包含插件名称到插件对象的名称-值映射的对象。当指定了 *files* 时，这些插件仅对匹配的文件可用。
- *rules* - 包含具体配置规则的对象。当指定了 *files* 或 *ignores* 时，这些规则配置仅对匹配的文件可用。
- *settings* - 一个包含键值对信息的对象，这些信息应对所有规则都可用。



整体来讲，上面的配置项不算多，而且很多配置项我们在前面是已经接触过的。

下面是一些之前没有接触过的配置项：

globals：该配置项位于 languageOptions 配置项下面，用于配置一些全局的设定：

```js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                var1: "writable",
                var2: "readonly"
            }
        }
    }
];
```

在上面的配置中，我们指定了 var1 这个变量是可写的，但是 var2 这个变量是只读的。

假设你有如下的代码

```js
var1 = 100;
var2 = 200; // 报错
```



parsers：配置解析器。解析器的作用是负责将源码解析为抽象语法树。ESLint 默认使用的解析器为 Espree，但是你可以指定其他的 parser，parser 需要是一个对象，该对象里面包含了 parse 或者 parseForESLint 方法。

```js
import babelParser from "@babel/eslint-parser";

export default [
    {
        files: ["**/*.js", "**/*.mjs"],
        languageOptions: {
            parser: babelParser
        }
    }
];
```

在上面的配置中，我们就指定了其他的 parser 来解析源码。



processor：这个是处理器，主要用于处理 ESLint 默认不能够处理的文件类型。举个例子，假设有一个 markdown 类型的文件，里面有一些 JS 代码，默认这些 JS 代码是不能够被 ESLint 处理的，通过添加额外的处理器，让 ESLint 能够对这些格式的文件进行 lint 检查

```js
import markdown from "eslint-plugin-markdown";

export default [
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown",
        settings: {
            sharedData: "Hello"
        }
    }
];
```

