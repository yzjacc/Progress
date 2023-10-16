# 自定义插件part2

要自定义 babel 的插件，实际上有一个固定的格式：

```js
module.exports = function(babel){
  // 该函数会自动传入 babel 对象
  // types 也是一个对象，该对象上面有很多的方法，方便我们对 AST 的节点进行操作
  const { types } = babel;
  
  return {
    name: "插件的名字",
    visitor: {
      // ...
      // 这里书写不同类别的方法，不同的方法会被进入不同类别的节点触发
    }
  }
}
```



## 示例一

创建一个自定义插件，该插件能够把 ES6 里面的 ** 转换为 Math.pow

在编写自定义插件的时候，会使用到 types 对象的一些方法：

- t.callExpression(callee, arguments)：这个函数用于**创建一个**表示<u>函数调用</u>的 *AST* 节点。*callee* 参数是一个表示被调用的函数的表达式节点，*arguments* 参数是一个数组，包含了所有的参数表达式节点。

- *t.memberExpression(object, property, computed = false)*：这个函数用于**创建一个**表示<u>属性访问</u>的 ***AST* 节点**。*object* 参数是一个表示对象的表达式节点，*property* 参数是一个表示属性名的标识符或表达式节点。*computed* 参数是一个布尔值，表示属性名是否是动态计算的。

- *t.identifier( )*: 创建 AST 节点，只不过**创建**的是 identifier 类型的 **AST 节点**。

插件的核心，其实就是创建一些新的 AST 节点，去替换旧的 AST 节点。

插件的代码如下：

```js
// 该插件负责将 ** --> Math.pow
// 例如 2 ** 3 ---> Math.pow(2, 3)

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "transform-to-mathpow",
    visitor: {
      // 当你遍历 AST 节点的时候
      // 遍历到二元表达式的时候会自动执行该方法
      BinaryExpression(path) {
        // 二元表达式比较多
        // 5 + 3
        // 1 / 2
        // 检查当前的节点的运算符是否是 **
        // 如果不是，直接返回
        if (path.node.operator !== "**") {
          return;
        }
        // 说明当前是 ** 我们要做一个替换操作
        // 首先需要生成新的 AST 节点，因为替换使用新的 AST 节点来替换的旧的 AST 节点

        // t.identifier("Math") // ---> Math
        // t.identifier("pow") // ---> pow

        // pow 需要作为 Math 的一个属性
        // Math.pow
        // t.memberExpress(t.identifier("Math"), t.identifier("pow"));

        const mathpowAstNode = t.callExpression(
          t.memberExpression(t.identifier("Math"), t.identifier("pow")),
          [path.node.left, path.node.right]
        );

        // 用新的 AST 节点替换旧的 AST 节点
        path.replaceWith(mathpowAstNode);
      },
    },
  };
};

```

在上面的代码中，我们就创建了一个自定义的插件，该插件首先对外暴露一个函数，该函数需要返回一个对象，对象里面就有访问器对象，访问器对象里面会有一些特定的方法，这些方法会在进入到特定的节点的时候被调用。

插件内部做的核心的事情：创建新的 AST 节点，然后去替换旧的 AST 节点。



## 示例二

编写一个自定义插件，该插件能够将箭头函数转为普通的函数。

```js
// a => {...}
// function(a){...}
module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "transform-arrow-to-function",
    visitor: {
      // 当你的节点类型为箭头函数表达式的时候
      // 执行特定的方法
      ArrowFunctionExpression(path) {
        let body; // 存储函数体

        if (path.node.body.type !== "BlockStatement") {
          // 进入此 if，说明箭头函数是一个表达式，需要将 body 部分转为返回语句
          // a => b
          // function(a){return b}
          body = t.blockStatement([t.returnStatement(path.node.body)]);
        } else {
          // 可以直接使用箭头函数的方法体
          body = path.node.body;
        }
        // 该方法创建一个普通函数表达式的 AST 节点（  function(){} ）
        const functionExpression = t.functionExpression(
          null, // 函数名
          path.node.params, // 函数参数，和箭头函数的参数是一致的
          body, // 函数方法体
          false, // 不是一个生成器函数
          path.node.async // 是否是异步函数，和箭头函数是一致的
        );

        path.replaceWith(functionExpression);
      },
    },
  };
};
```

