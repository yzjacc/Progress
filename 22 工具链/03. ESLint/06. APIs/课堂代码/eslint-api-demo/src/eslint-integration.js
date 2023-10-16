const { ESLint } = require("eslint");
const chalk = require("chalk");

/**
 * 创建并返回 eslint 实例对象
 * @param {*} overrideConfig
 */
function createESLintInstance(overrideConfig) {
  return new ESLint({
    useEslintrc: false,
    overrideConfig,
    fix: true,
  });
}


/**
 * 该函数负责对传入的文件做 lint 检查以及修复
 * @param {*} eslint 
 * @param {*} filePaths 
 */
async function lintAndFix(eslint, filePaths){
    // 要做 lint 检查，很明显就是调用 eslint 实例对象上面的方法
    const results = await eslint.lintFiles(filePaths);

    // 接下来对这些问题进行一个修复
    // 该方法会将修复的结果写入到原来的文件系统中
    await ESLint.outputFixes(results);

    return results;
}

/**
 * 该方法负责对 lint 后的结果进行一个友好的输出
 * @param {*} results 
 */
function outputLintingResults(results){
    // 拿到 lint 后错误的总数（包含警告）
    const problems = results.reduce((a, b)=> a + b.errorCount + b.warningCount, 0);
    if(problems > 0) {
        console.log("Linging errors found! \n");

        const messages = results[0].messages;
        for(let i=0;i<messages.length;i++) {
            console.error(chalk.red.bold(" FAIL ") + " " + messages[i].message);
        }
        // dim 是 chalk 库里面的一个方法，用于创建一种暗淡模式的输出
        console.log("\n" + chalk.dim(results[0].filePath));

    } else {
        console.log("No linting errors found");
    }
}



/**
 * 向外部暴露的方法，用于检查对应的文件
 * @param {*} filePaths 要做 lint 检查的文件路径
 */
async function lintFiles(filePaths) {
  // 创建一个配置对象
  // 你可以在这里指定你的配置，也可以通过读取文件的方式从外部进行读取
  const overrideConfig = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-console": "error",
    },
  };

  // 创建一个 eslint 的实例
  const eslint = createESLintInstance(overrideConfig);
  // 对源码文件进行 lint 检查以及修复
  const results = await lintAndFix(eslint, filePaths);
  // 控制台需要输出 lint 的结果
  outputLintingResults(results);
  return results;
}

module.exports = {
  lintFiles,
};
