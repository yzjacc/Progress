# APIs

*While ESLint is designed to be run on the command line, it’s possible to use ESLint programmatically through the Node.js API. The purpose of the Node.js API is to allow plugin and tool authors to use the ESLint functionality directly, without going through the command line interface.*



一般在如下的场景中，我们会涉及到使用 API 来编程：

- 要将工具集成到代码编辑器或者 IDE 里面
- 自定义 linter 工具
- 一些在线的学习平台



首先我们初始化一个项目 eslint-api-demo，然后使用 pnpm init 进行一个初始化，之后安装 eslint 依赖：

```bash
pnpm add eslint
```

安装的时候一定要注意，这一次安装是安装为项目依赖，而非开发依赖，因为我们是使用的 API 的形式来检查其他项目，本项目类似于提供给其他项目的一个第三方库，因此在我们这个项目中，eslint 即便是在运行期间也是需要的。



接下来在 src 目录下面创建一个 eslint-integration.js 文件，这个是我们的核心逻辑文件

```js
const { ESLint } = require("eslint");

/**
 * 创建并返回 eslint 实例对象
 * @param {*} overrideConfig
 */
function createESLintInstance(overrideConfig) {
  new ESLint({
    useEslintrc: false,
    overrideConfig,
    fix: true,
  });
}

/**
 * 向外部暴露的方法，用于检查对应的文件
 * @param {*} filePaths 要做 lint 检查的文件路径
 */
function lintFiles(filePaths) {
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
  createESLintInstance(overrideConfig);
}

module.exports = {
  lintFiles,
};

```

在上面的代码中，有一个 new ESLint，ESLint 是 eslint 里面提供的一个类，关于在实例化这个类的时候，配置对象提供了哪些配置项，可以参阅：https://eslint.org/docs/latest/integrate/nodejs-api#-new-eslintoptions



之后我们创建了一个名为 lintAndFix 的方法，该方法负责对具体的代码文件进行 lint 检查以及修复工作：

```js
/**
 * 该函数负责对传入的文件做 lint 检查以及修复
 * @param {*} eslint 
 * @param {*} filePaths 
 */
async function lintAndFix(eslint, filePaths){
    // 要做 lint 检查，很明显就是调用 eslint 实例对象上面的方法
    const results = await eslint.lintFiles(filePaths);

    console.log(results);
}
```

可以看到，内部实际上调用了 eslint 实例对象上面的 lintFiles 方法，关于 eslint 实例对象有哪些方法，可以参阅官方的 API 文档：

https://eslint.org/docs/latest/integrate/nodejs-api#-eslintlintfilespatterns



最后，我们要对检查的结果做一个友好的控制台输出：

```js
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
```

注意，上面的代码中，为了美化其输入，我们使用了 chalk 这个库，这个库的最新版本 5.0.0 使用的是 ESM 模块化风格，但是我们这里需要 CommonJS 模块，所以这里可以安装 4.0.0 的版本