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
