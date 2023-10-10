// const axios = require("axios");
const User = require("../api/userApi");
const userData = require("./user.json");

// 模拟 axios 模块
jest.mock("axios", () => {
  const userData = require("./user.json");
  // 模拟响应数据
  const resp = {
    data: userData,
  };
  return {
    get: jest.fn(() => Promise.resolve(resp)),
    test : jest.fn(() => Promise.resolve("this is a test")),
  };
});

// 测试用例
test("测试获取用户数据", async () => {
  // 现在我们已经模拟了 axios
  // 但是目前的 axios 没有书写任何的行为
  // 因此我们需要在这里进行一个 axios 模块行为的指定
  // 指定了在使用 axios.get 的时候返回 resp 响应
  // axios.get.mockImplementation(()=>Promise.resolve(resp));

  await expect(User.all()).resolves.toEqual(userData);
  await expect(User.testArg()).resolves.toEqual("this is a test");
});
