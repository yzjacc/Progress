import { startTimeout, stopTimeout } from "../ts/tools";

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test("开启延时器",()=>{
    const callback = jest.fn();
    const timeout = 3000;
    const setTimeout = jest.spyOn(window, "setTimeout");

    startTimeout(callback, timeout);

    // 进行断言测试
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalled();
    expect(setTimeout).toBeCalledTimes(1);
});

test("停止计时器",()=>{
    const callback = jest.fn();
    const timeout = 3000;
    const setTimeout = jest.spyOn(window, "setTimeout");

    const timerId = startTimeout(callback, timeout);
    stopTimeout(timerId);

    jest.advanceTimersByTime(timeout);
    expect(callback).not.toHaveBeenCalled();
    expect(setTimeout).toBeCalledTimes(1);
});

test("时间不能传递负数",()=>{
    const callback = jest.fn();
    const timeout = -3000;
    const setTimeout = jest.spyOn(window, "setTimeout");

    const timerId = startTimeout(callback, timeout);
    stopTimeout(timerId);

    jest.advanceTimersByTime(5000);
    expect(callback).not.toHaveBeenCalled();
    expect(setTimeout).toBeCalledTimes(0);
});