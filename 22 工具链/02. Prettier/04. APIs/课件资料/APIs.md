# APIs

在前面我们对代码进行格式化的时候，我们采用的是命令行工具的形式，但是这些命令行工具所提供的命令实际上也是调用的 prettier 背后对应的各种 API。

在官网能够查看到这些 API：https://prettier.io/docs/en/api.html



## prettier.format(source, options)

这个 API 是整个 prettier 里面最最核心的 API，该 API 负责的就是格式化操作。

下面是一个使用该 API 进行代码格式化的例子：

```js
// 该文件使用 API 的形式来对代码进行格式化

const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

// prettier.format(source, options)

// console.log(sourcePath);
// /Users/jie/Desktop/prettier-demo/src/index.js

// const optionsPath = path.resolve(".prettierrc");

// 书写 prettier 规则配置
const options = {
  singleQuote: false,
  printWidth: 50,
  semi: false,
  trailingComma: "es5",
  parser: "babel",
};

// 读取 src 目录

fs.readdir("src", (err, files) => {
  if (err) throw err;

  for (let i = 0; i < files.length; i++) {
    // 拼接路径
    const sourcePath = path.resolve("src", files[i]);

    // 读取源码文件
    const jsSource = fs.readFileSync(sourcePath, "utf8");

    // 使用 prettier.format 来进行格式化
    // 通过 API 的方式来格式化，一定要指定 parser
    prettier.format(jsSource, options).then((res) => {
      // 将格式化好的结果重新写入到原来的文件里面
      fs.writeFileSync(sourcePath, res, "utf-8");
    });
  }
  console.log("格式化完毕...");
});

```

注意在使用 API 进行格式化的时候，格式化规则里面需要添加 parser，指定对应的解析器，关于能够添加哪些 parser，可以参阅：https://prettier.io/docs/en/options.html#parser

之后就是读取目录下面的文件，调用 format API 进行格式化操作，格式化完成之后将格式化的结果重新写入到原来的文件里面。



## prettier.check(source, [ options ])

该 API 主要负责核对对应的文件是否已经被 prettier 格式化，如果已经被格式化，则返回 true，否则返回 false

下面是一个使用示例：

```js
// 判断 src 下面是否所有的文件都已经格式化

const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

// 书写 prettier 规则配置
const options = {
  singleQuote: false,
  printWidth: 50,
  semi: false,
  trailingComma: "es5",
  parser: "babel",
};

fs.readdir("src", async (err, files) => {
  if (err) throw err;

  let isAllFormated = true;
  for (let i = 0; i < files.length; i++) {
    // 拼接路径
    const sourcePath = path.resolve("src", files[i]);

    // 读取源码文件
    const jsSource = fs.readFileSync(sourcePath, "utf8");

    const res = await prettier.check(jsSource, options);

    if (!res) {
      // 说明这个文件没有被格式化
      console.log(`${files[i]} 文件还没有格式化`);
      isAllFormated = false;
    }
  }
  if (isAllFormated) {
    console.log("所有文件都已经格式化...");
  }
});
```

