const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

/* 测试完成后关闭数据库连接。*/
afterAll(async () => {
  await mongoose.connection.close();
});

test("测试分页获取书籍", async () => {
  const res = await request(app)
    .get("/api/book")
    .query({ current: 1, pageSize: 5 }); // 添加查询参数

  // 进行断言
  expect(res.statusCode).toBe(200);
  expect(res.body.data.currentPage).toBe(1);
  expect(res.body.data.eachPage).toBe(5);
  expect(res.body.data.count).toBe(20);
  expect(res.body.data.totalPage).toBe(4);
});
