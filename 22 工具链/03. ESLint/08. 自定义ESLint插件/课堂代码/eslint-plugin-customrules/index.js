// 该文件是整个包的入口文件，用于导出所有的规则

module.exports = {
  rules: {
    // 规则名称 : 规则文件
    "no-alert": require("./rules/no-alert"),
    "no-console-log": require("./rules/no-console-log"),
  },
};
