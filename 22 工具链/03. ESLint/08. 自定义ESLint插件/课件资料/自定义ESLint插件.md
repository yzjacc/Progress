# 自定义ESLint插件

ESLint插件主要是用来扩展ESLint本身没有的功能，这里包括扩展规则、扩展配置、扩展解析器。

90%的ESLint插件都是以扩展规则为主，所以这些插件里面会包含大量的自定义规则。

像这一类的插件，一般一条规则会对应一个 JS 文件，JS 文件里面需要导出一个对象：

```js
module.exports = {
  // 元数据信息
  meta: {
    
  },
  // 规则具体的实现
  create: function(){
    return {}
  }
}
```

1. meta

这个字段提供这条规则相应的元数据信息：

- *type*: 描述规则的类型。可以是以下的一个：
    - "*problem*"：表示这个规则识别的是可能导致错误的代码问题。
    - "*suggestion*"：表示这个规则识别的是可能的改进，以使代码更易于阅读和/或更具可维护性。
    - "*layout*"：表示这个规则识别的是布局问题，即风格指南中的问题，而不会影响代码的功能。
- *docs*：提供关于规则的文档信息，可以包含以下字段：
    - *description*：规则的简短描述，通常用于生成文档。
    - *recommended*：一个布尔值，表示这个规则是否在配置为 "*recommended*"（推荐）的情况下被启用。
    - *url*：指向规则文档的 *URL*。
- *fixable*：说明是否可以自动修复由此规则识别的问题，以及如何修复。如果规则可以自动修复问题，此字段应为 "*code*" 或 "*whitespace*"，否则应为 *null* 或省略。
- *deprecated*：一个布尔值，表示这个规则是否已被弃用。默认为 *false*。



2. create

这个字段对应的是一个函数，该函数会返回一个对象，对象里面又是一个一个的方法，例如有如下的方法：

> 我们所书写的源代码最终会被解析一个抽象语法树，这个抽象语法树就是一个树结构，里面由一个一个的节点组成的，每一个节点是一个 token，工具在处理你的源码的时候，实际上就会去遍历这棵树，遍历到对应的节点，然后针对对应节点做出相应的处理。

- *Program*: 这个方法会在遍历抽象语法树开始时被调用。
- *FunctionDeclaration*：这个方法会在遍历到一个函数声明时被调用。
- *VariableDeclaration*：这个方法会在遍历到一个变量声明时被调用。
- *ExpressionStatement*：这个方法会在遍历到一个表达式语句时被调用。
- *CallExpression*：这个方法会在遍历到一个函数调用时被调用。
- *ReturnStatement*：这个方法会在遍历到一个 *return* 语句时被调用。

上面这些方法所对应的名称实际上都来源于 ESTree 规范里面所定义的 AST 节点类型。

这些方法里面接收一个参数，该参数是当前所遍历到的 AST 节点对象，你通过这个节点对象就可以拿到当前节点一些具体的信息以及该节点对应的子节点。

```js
create: function(){
    return {
      CallExpression(node){
        // ...
      }
    }
}
```

除了节点处理函数以外，create 方法还会自动传入一个 context 参数

```js
create: function(context){
    return {
      CallExpression(node){
        // ...
      }
    }
}
```

该参数提供了一些方法：

- *context.report(descriptor)*：这个方法用于报告一个问题。*descriptor* 是一个对象，包含了问题的信息，如问题的位置、消息等。
- *context.getSourceCode( )*：这个方法返回一个 *SourceCode* 对象，你可以使用它来访问源代码的文本和 *AST*。
- *context.getAncestors( )*：这个方法返回一个包含当前节点的所有祖先节点的数组，数组中的第一个元素是最近的祖先。
- *context.getScope( )*：这个方法返回一个代表当前作用域的 *Scope* 对象。

> 补充：
>
> 视频中忘记说了，同学们可以在 https://eslint.org/docs/latest/extend/custom-rules 看到自定义规则的完整结构，包括 meta 完整的配置项有哪些，context 完整的方法有哪些等信息。



接下来我们来看一个插件的实战案例。

首先我们需要创建一个插件项目 eslint-plugin-\<插件名称>

例如我们的项目叫做 eslint-plugin-customrules，首先使用 pnpm init 进行一个项目初始化，然后在项目根目录中创建 rules 目录，该目录用于存放我们的自定义规则。

接下来我们创建了如下的两条规则：

```js
// 不允许有 alert 语句
// alert("xxx")
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of alert",
      category: "Best Practices",
    },
    fixable: null,
  },
  create(context) {
    return {
      // 这个方法会在遍历到一个函数调用时被调用
      CallExpression(node) {
        if (node.callee.name === "alert") {
          // 说明当前是一个 alert 的函数调用
          context.report({
            node,
            message: "不允许出现 alert 语句呀，兄弟",
          });
        }
      },
    };
  },
};
```

```js
// console.log("xxx")
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of console.log",
      category: "Best Practices",
    },
    fixable: null,
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.object &&
          node.callee.object.name === "console" &&
          node.callee.property.name === "log"
        ) {
          context.report({
            node,
            message: "不允许出现 console.log 语句呀，兄弟",
          });
        }
      },
    };
  },
};
```

每一条规则对应一个 JS 文件，该 JS 文件导出一个对象，该对象里面包含了基本的 meta 和 create 配置项。

下一步我们需要去 package.json 中，修改如下配置项：

```js
"peerDependencies": {
  "eslint": "^7.0.0"
}
```

- peerDependencies：该配置项指定了我们这个包需要和哪些其他包在同一环境中使用。例如我们上面指定了 eslint ^7.0.0，也就是告诉别人，在使用我们这个包的时候，需要安装 eslint，并且 eslint 的版本要在 7.0.0 以上。



最后是创建入口文件，用于将所有的规则导出：

```js
// index.js

// 该文件是整个包的入口文件，用于导出所有的规则

module.exports = {
  rules: {
    // 规则名称 : 规则文件
    "no-alert": require("./rules/no-alert"),
    "no-console-log": require("./rules/no-console-log"),
  },
};
```

至此，我们一个简单的示例插件就书写完毕了。



接下来我们需要测试这个插件。这里我们选择通过 link 的方式来进行本地链接，从而方便我们的测试。

来到插件的根目录，执行 npm link，这样的话该项目就会创建一个软链接到全局包目录里面，回头其他项目就可以通过 link 的方式来链接这个包。



之后我们创建一个测试项目，例如名字叫做 eslint-test-customplugin，使用 npm 进行初始化（因为 npm 和 pnpm 在 link的时候执行机制有一些区别，npm link 时的速度比 pnpm 快一些），然后安装 eslint

```bash
npm i eslint -D
```

然后在 src/index.js 中书写一些测试代码：

```js
alert("Hello");
console.log("World");
```

最后是链接对应的插件包，然后配置文件中配置该插件即可：

```bash
npm link eslint-plugin-customrules
```

配置文件 .eslintrc.json 中配置：

```js
{
  "plugins": ["customrules"],
  "rules": {
    "customrules/no-console-log": "warn",
    "customrules/no-alert": "error"
  }
}
```

