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
