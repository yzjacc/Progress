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
