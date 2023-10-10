/**
 * 改文件就是一个测试文件
 * 在该文件中，我们会书写一个一个的测试用例
 * 安装了 jest 之后，默认会提供一些全局的方法和对象
 * test、expect、jest
 */

const { sum, sub, mul, div } = require("./tools");

describe("这是一组测试，测试加减法", () => {
  // 回调函数中就放一个一个的测试用例

  /**
   * 一个 test 方法意味着书写了一个测试用例
   * param1 ：针对这个测试用例的一个描述
   * param2 ：执行该用例所对应的回调函数
   */
  test("测试加法", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("测试减法", () => {
    expect(sub(10, 5)).toBe(5);
  });
});

describe("这是一组测试，测试乘除法", () => {
  /**
   * it 方法实际上是 test 方法的一个别名
   */
  it("测试乘法", () => {
    expect(mul(2, 3)).toBe(6);
  });

  it("测试除法", () => {
    expect(div(10, 2)).toBe(5);
  });
});