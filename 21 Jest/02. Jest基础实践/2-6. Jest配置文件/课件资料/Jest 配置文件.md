# Jest 配置文件

在官网对应的 ：https://jestjs.io/docs/configuration 可以看到 Jest 中所有的配置项目。

当我们要对 Jest 进行大量的配置的时候，肯定是需要配置文件的，那么首先我们需要生成一个配置文件：

```js
npx jest --init
```

生成配置文件如下图所示：

![image-20230424092507341](https://resource.duyiedu.com/xiejie/2023-04-24-012507.png)



下面介绍一些配置文件中常见的配置项。



collectCoverage：会收集并显示测试覆盖率，包含每个文件中每种类型的代码（语句、分支、函数和行）的测试覆盖率

<img src="https://resource.duyiedu.com/xiejie/2023-04-24-012840.png" alt="image-20230424092839487" style="zoom:50%;" />

在上面的表格中，我们能够看到如下的信息：

- % Stmts：包含语句的百分比，即被测试覆盖的语句占总语句数的比例。
- % Branch：包含分支的百分比，即被测试覆盖的分支占总分支数的比例。
- % Funcs：包含函数的百分比，即被测试覆盖的函数占总函数数的比例。
- % Lines：包含行的百分比，即被测试覆盖的行占总行数的比例。
- Uncovered Line #s：未被测试覆盖的行号。

从上面的测试报告中，我们可以看出，tools.js 文件下面的 sum 和 sub 这两个函数的测试没有被覆盖到，因为我们在测试的时候，我们是将原来的 sum 和 sub 替换掉了的。

当 collectCoverage 设置为 true 之后，还可以设置 coverageThreshold 代码覆盖率的阀值：

```js
module.exports = {
  // ...
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  // ...
};
```

另外，在项目根目录下面，还新生成了一个 coverage 的目录，里面其实就是各种格式（xml、json、html）的测试报告，之所以生成不同格式的报告，是为了方便你后面通过不同的工具来进行读取。

例如 HTML 版本的测试报告如下图所示：

![image-20230424095300700](https://resource.duyiedu.com/xiejie/2023-04-24-015301.png)

testMatch：这个配置项可以指定 Jest 应该运行哪些测试文件。默认情况下， Jest 会查找 .test.js 或者 .spec.js 结尾的文件

例如我们将该配置修改为如下：

```js
testMatch: [
    "**/test/**/*.[jt]s?(x)",
],
```



moduleFileExtensions :指定 Jest 查找测试文件时应该搜索哪些文件扩展名。



setupFilesAfterEnv：指定 Jest 在运行测试之前应该运行哪些文件。例如：

```js
setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
```

在执行每个测试套件（文件）之前，都会先执行这个 setupTests 文件