const { sum, sub, mul, div } = require("../utils/tools");

jest.mock("../utils/tools", () => {
  // 在这里来改写文件模块的实现

  // 拿到 ../utils/tools 路径所对应的文件原始模块
  const originalModule = jest.requireActual("../utils/tools");

  // 这里相当于是替换了原始的模块
  // 一部分方法使用原始模块中的方法
  // 一部分方法（sum、sub）被替换掉了
  return {
    ...originalModule,
    sum: jest.fn(() => 100),
    sub: jest.fn(() => 50),
  };
});

test("对模块进行测试", () => {
  expect(sum(1, 2)).toBe(100);
  expect(sub(10, 3)).toBe(50);
  expect(mul(10, 3)).toBe(30);
  expect(div(10, 2)).toBe(5);
});
