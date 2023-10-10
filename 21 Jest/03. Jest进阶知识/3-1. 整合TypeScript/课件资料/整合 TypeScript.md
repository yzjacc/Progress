# 整合 TypeScript



## 准备工作

首先我们需要有一个基于 *ts* 的项目。

第一步通过 npm init -y 初始化项目

接下来通过：

```js
npm install typescript
```

局部安装 typescript。



之后还需要生成 typescript 的配置文件，通过命令：

```js
npx tsc --init
```

因为我们的项目是在 node 环境中运行，所以还需要安装 node 的类型说明文件

```js
npm i --save-dev @types/node
```



在 node 环境中，如果模块化使用的是 commonjs 规范，那么会存在一个问题，如果在一个模块中导出内容，在另外一个模块中导入这些内容，会提示“无法重新声明块范围变量”。

之所以会这样，是因为在 commonjs 规范里面，没有像 ESmodule 中能形成闭包的模块概念，所有的模块在引用的时候会被抛到全局，因此 ts 就会认为这里重复声明了模块。

要解决这个问题，首先在 ts 配置文件中，将 esModuleInterrop 开启为 true，该配置项用于控制是否启用 ES 模块规范的兼容性处理。

接下来在 tools.ts 文件的最后一行添加 export { } ，这一行代码会让 ts 认为这是一个 ESModule，从而不存在变量重复声明的问题。



项目书写完之后，我们可以配置要编译的 js 存储到哪一个目录下面：

```js
{
  "compilerOptions": {
    "outDir": "./dist",  
  },
  "include": ["./src"]
}
```



## 使用 jest 测试

首先第一步还是安装 jest，命令如下：

```js
npm install --save-dev jest
```

生成配置文件：

```js
npx jest --init
```



接下来在 *src* 目录下面创建 \__test__ 这个目录，在这个目录里面新增测试套件，一般来讲一个函数对应一个测试套件，在测试套件中会针对不同的参数来书写对应的测试用例。

```ts
const { randomNum } = require("../utils/tools");

test("测试随机数", () => {
  // 得到一个 4 位数的数组
  const result = randomNum();
  expect(result.length).toBe(4);
  expect(new Set(result).size).toBe(4);
  result.forEach((num: number) => {
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThanOrEqual(9);
  });
});

export {};
```

```ts
const { isRepeat } = require("../utils/tools");

test("参数为string类型数组", () => {
  expect(isRepeat(["1", "1", "2", "3"])).toBe(true);
  expect(isRepeat(["1", "4", "2", "3"])).toBe(false);
});

test("参数为number类型数组", () => {
  expect(isRepeat([1, 1, 2, 3])).toBe(true);
  expect(isRepeat([1, 4, 5, 6])).toBe(false);
});

export {};
```

在书写了测试用例之后，会发现 ts 报错，说找不到 jest 相关的类型说明，这一点和 node 是相似的，需要安装 jest 相关的类型说明文件

```js
npm i --save-dev @types/jest
```

除此之外，我们还需要安装一个名为 ts-jest 的库，这是一个 ts 的预处理器，可以让我们在使用 jest 来测试 ts 代码的时候直接运行 ts 代码：

```js
npm i ts-jest -D
```

还需要修改 jest 的配置文件，将 preset 修改为 ts-jest

```js
preset: "ts-jest",
```



