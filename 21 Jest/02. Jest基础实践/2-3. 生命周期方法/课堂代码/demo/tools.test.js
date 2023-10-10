const { sum, sub, mul, div } = require("./tools");

// beforeEach 会在执行每一个测试用例之前被触发
beforeEach(() => {
  console.log("全局的beforeEach");
});

// afterEach 会在执行每一个测试用例之后被触发
afterEach(() => {
  console.log("全局的afterEach");
});

// beforeAll 是在整个测试套件的第一个测试用例执行之前执行
beforeAll(() => {
  console.log("全局的beforeAll");
});

// afterAll 会在所有测试用例执行完成之后，然后再执行 afterAll
afterAll(() => {
  console.log("全局的afterAll");
});

// 第一组
describe("第一组", () => {
  beforeAll(() => {
    console.log("开始进行第一组测试");
  });

  test("测试加法函数", () => {
    const result = sum(1, 3);
    expect(result).toBe(4);
    console.log("\x1b[31m%s\x1b[0m", "测试加法函数");
  });

  test("测试减法函数", () => {
    const result = sub(15, 10);
    expect(result).toBe(5);
    console.log("\x1b[31m%s\x1b[0m", "测试减法函数");
  });
});

// 第二组
describe("第二组", () => {
  beforeEach(() => {
    console.log("\x1b[34m%s\x1b[0m", "分组beforeEach");
  });
  afterEach(() => {
    console.log("\x1b[34m%s\x1b[0m", "分组afterEach");
  });

  beforeAll(() => {
    console.log("\x1b[32m%s\x1b[0m", "分组beforeAll");
  });
  afterAll(() => {
    console.log("\x1b[32m%s\x1b[0m", "分组afterAll");
  });

  //   beforeAll(() => {
  //     console.log("开始进行第二组测试");
  //   });

  test.only("测试乘法函数", () => {
    const result = mul(2, 3);
    expect(result).toBe(6);
    console.log("\x1b[31m%s\x1b[0m", "测试乘法函数");
  });

  test("测试除法函数", () => {
    const result = div(50, 2);
    expect(result).toBe(25);
    console.log("\x1b[31m%s\x1b[0m", "测试除法函数");
  });
});
