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
