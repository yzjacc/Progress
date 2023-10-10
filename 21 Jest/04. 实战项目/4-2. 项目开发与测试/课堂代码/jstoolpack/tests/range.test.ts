import { range } from "../src/array";

test("正常的情况", () => {
  expect(range(1, 6)).toEqual([1, 2, 3, 4, 5]);
  expect(range(1, 6, 2)).toEqual([1, 3, 5]);

  expect(range(6, 1)).toEqual([6, 5, 4, 3, 2]);
  expect(range(6, 1, -2)).toEqual([6, 4, 2]);
});

test("错误的情况", () => {
  expect(range()).toEqual([]);
  expect(range("a", "b", "c")).toEqual([]);
});

test("测试只传入start", () => {
    // 相当于结束值默认为 0
    expect(range(2)).toEqual([2, 1]);
    expect(range(-2)).toEqual([-2, -1]);
});

test("测试step", () => {
    expect(range(1, 6, -2)).toEqual([1, 3, 5]);
    expect(range(6, 1, 2)).toEqual([6, 4, 2]);
});
