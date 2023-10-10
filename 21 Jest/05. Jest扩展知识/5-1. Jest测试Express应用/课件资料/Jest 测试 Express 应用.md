# Jest 测试 Express 应用

我们这里要测试的项目，是之前 React 篇章中开发的 coderstation 服务器：

- 服务器框架：Express
- 数据库：MongoDB

这里我们针对 Express 服务器端应用进行测试，主要是测试该应用所提供的端口是否能够正常的工作，会连接真实的数据库，这里实际上是属于一个集成测试。

这里在进行测试的时候，需要安装如下的依赖：

```js
npm i jest supertest
```

这里简单的介绍一下 *supertest*，这是一个用于测试 *HTTP* 服务器的 *Node.js* 库，它提供了一个高级抽象，让你可以轻松地发送 *HTTP* 请求并对响应进行断言。*Supertest* 通常与测试框架（如 *Jest、Mocha* 等）一起使用，以便编写端到端的 *API* 测试。

*Supertest* 的一些主要特点包括：

1. 链式语法：*Supertest* 使用流畅的链式语法，让你可以轻松地编写和阅读测试代码。例如，你可以通过 .*get*('/') 发送 *GET* 请求，通过 .*expect*(200) 验证响应状态码等。
2. 内置断言：*Supertest* 支持许多内置断言，如响应状态码、内容类型、响应头等。你可以使用这些断言来验证 *API* 响应是否符合预期。
3. 与测试框架集成：*Supertest* 可以与流行的测试框架（如 *Jest、Mocha* 等）无缝集成，使你可以使用熟悉的测试工具编写端到端的 *API* 测试。
4. 支持 *Promises* 和 *async/await*：*Supertest* 支持 *Promises* 和 *async/await*，让你可以编写更简洁、可读的异步测试代码。

官方文档地址：*https://github.com/ladjs/supertest*



安装完依赖之后，在项目的根目录下面创建 tests 目录，用来放置我们的测试文件，接下来就可以针对每一个模块进行一个接口的集成测试。

假设我们这里对 issue 这个模块进行测试，测试代码如下：

```js
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

// 当前测试套件里面的所有的测试用例跑完之后关闭数据库连接
afterAll(async () => {
  await mongoose.connection.close();
});

// 接下来来书写我们的测试用例

test("测试分页获取问题", async () => {
  // act 行为
  const res = await request(app).get("/api/issue").query({
    current: 1,
    pageSize: 5,
    issueStatus: true,
  });

  // assertion 断言
  expect(res.statusCode).toBe(200);
  expect(res.body.data.currentPage).toBe(1);
  expect(res.body.data.eachPage).toBe(5);
  expect(res.body.data.count).toBe(21);
  expect(res.body.data.totalPage).toBe(5);
});

test("根据id获取其中一个问答的详情", async () => {
  const res = await request(app).get("/api/issue/6357abfb37fe7a1aab3aeae8");

  // 进行断言
  expect(res.statusCode).toBe(200);
  expect(res.body.data._id).toBe("6357abfb37fe7a1aab3aeae8");
  expect(res.body.data.issueTitle).toBe(
    "如果遇到组件使用到主题相关颜色一般怎么处理比较好?"
  );
});

test("新增问答", async () => {

    // 这里有一个注意点：
    // 由于我们连接的是真实的数据库，发送的也是真实的请求
    // 因此这里会真实的修改数据库的状态

    // 如果不想真实的数据库受影响：
    // 解决方案：
    // 1. 使用单独的测试数据库（推荐此方案）
    // 2. 使用模拟

  const res = await request(app).post("/api/issue").send({
    issueTitle: "hello",
    issueContent: "thank you",
    userId: "6343d93b0513e856480148c9",
    typeId: "6344fbcd890d0f907da2193e",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.data.issueTitle).toBe("hello");
  expect(res.body.data.issueContent).toBe("thank you");
  expect(res.body.data.scanNumber).toBe(0);
  expect(res.body.data.commentNumber).toBe(0);
  expect(res.body.data.issueStatus).toBe(false);
  expect(res.body.data.userId).toBe("6343d93b0513e856480148c9");
  expect(res.body.data.typeId).toBe("6344fbcd890d0f907da2193e");

  // 新增失败的验证
  const res2 = await request(app).post("/api/issue").send({
    issueTitle: "hello",
    issueContent: "thank you",
  });

  expect(res2.body.code).toBe(406);
  expect(res2.body.msg).toBe("数据验证失败");
  expect(res2.body.data).toBeNull();

});
```

这里面有这么几个注意点：

1. 在测试套件跑完之后，可能会存在一些服务一直处于开启状态，这里我们可以给 jest 添加一个配置

```js
"scripts": {
    // ...
    "test": "jest --detectOpenHandles"
 },
```

添加该配置后，jest 就能够侦查是哪个服务没有在测试跑完后关闭，比如我们上面的例子，就是 mongodb 没有关闭



2. 我们需要在测试完成后，关闭 mongodb 服务，可以在生命周期钩子函数中（afterAll）里面做关闭操作

```js
// 当前测试套件里面的所有的测试用例跑完之后关闭数据库连接
afterAll(async () => {
  await mongoose.connection.close();
});
```



3. 在进行测试的时候，会发送真实的请求，并且会连接真实的数据库，这意味着会更改数据库的状态

如果不想真实的数据库状态受影响，有如下两种方案：

- 使用单独的测试数据库
- 使用模拟方案

推荐使用第一种（测试数据库）方案，因为这里本来就是在做集成测试。