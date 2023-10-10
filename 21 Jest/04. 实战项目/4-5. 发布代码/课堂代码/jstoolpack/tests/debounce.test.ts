import { debounce } from "../src/function";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

test("应该在等待时间之后调用函数",()=>{
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    jest.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(1);
})


test("当防抖函数执行的时候，始终只执行最后一次的调用",()=>{
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc('a');
    debouncedFunc('b');
    debouncedFunc('c');

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledWith('c');
})



test("在等待时间内又调用了函数，重置计时器",()=>{
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    jest.advanceTimersByTime(500);

    debouncedFunc();
    jest.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
})
