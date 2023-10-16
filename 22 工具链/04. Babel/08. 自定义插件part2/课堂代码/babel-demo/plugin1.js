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
