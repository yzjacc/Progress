import useCounter from "../hooks/useCounter";
import { renderHook, act } from "@testing-library/react";

test("可以做加法", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0));

  // Act（行为）
  act(() => result.current[1].inc(2));

  // Assert（断言）
  expect(result.current[0]).toEqual(2);
});

test("测试异步的增加",async ()=>{
    jest.useFakeTimers();
    const {result} = renderHook(()=>useCounter(0));
    act(() => result.current[1].asyncInc(2));
    expect(result.current[0]).toEqual(0);
    await act(()=>jest.advanceTimersByTime(2000));
    expect(result.current[0]).toEqual(2);
    jest.useRealTimers();
});

test("可以做减法", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0));

  // Act（行为）
  act(() => result.current[1].dec(2));

  // Assert（断言）
  expect(result.current[0]).toEqual(-2);
});

test("可以设置值", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0));

  // Act（行为）
  act(() => result.current[1].set(100));

  // Assert（断言）
  expect(result.current[0]).toEqual(100);
});

test("可以重置值", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0));

  // Act（行为）
  act(() => result.current[1].set(100));
  act(() => result.current[1].reset());

  // Assert（断言）
  expect(result.current[0]).toEqual(0);
});

test("可以设置最大值", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0, { max: 100 }));

  // Act（行为）
  act(() => result.current[1].set(1000));

  // Assert（断言）
  expect(result.current[0]).toEqual(100);
});

test("可以设置最小值", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0, { min: -100 }));

  // Act（行为）
  act(() => result.current[1].set(-1000));

  // Assert（断言）
  expect(result.current[0]).toEqual(-100);
});
