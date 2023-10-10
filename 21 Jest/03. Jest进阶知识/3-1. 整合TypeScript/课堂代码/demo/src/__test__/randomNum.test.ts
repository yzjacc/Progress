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