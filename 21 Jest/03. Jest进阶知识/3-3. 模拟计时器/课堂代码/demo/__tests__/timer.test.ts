import { startTimer, stopTimer } from "../ts/tools";

beforeEach(()=>{
    // 在每个测试用例开始之前，使用模拟计时器
    jest.useFakeTimers();
});
afterEach(()=>{
    // 使用真实的计时器
    jest.useRealTimers();
});

test("开始计时器",()=>{
    const callback = jest.fn(); // 创建一个空的模拟函数
    const interval = 1000;
    const setInterval = jest.spyOn(window, "setInterval"); // 避免调用真实的 setInterval 开启计时器

    const timerId = startTimer(callback, interval);

    // 接下来就使用各种断言来进行测试
    expect(setInterval).toHaveBeenCalledTimes(1); // 调用了 startTimer 方法后 setInterval 只应该执行一次
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), interval); // 断言 setInterval 调用的时候对应的参数

    jest.advanceTimersByTime(interval); // 时间快进 1 秒
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval); // 时间快进 1 秒
    expect(callback).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenCalledTimes(1); 
    stopTimer(timerId);
});

test("停止计时器",()=>{
    const callback = jest.fn();
    const interval = 1000;
    const setInterval = jest.spyOn(window, "setInterval"); // 避免调用真实的 setInterval 开启计时器
    const timerId = startTimer(callback, interval);
    stopTimer(timerId);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(callback).not.toHaveBeenCalled();
});

test("测试时间为负数",()=>{
    const callback = jest.fn();
    const interval = -1000;
    const setInterval = jest.spyOn(window, "setInterval"); // 避免调用真实的 setInterval 开启计时器

    const timerId = startTimer(callback, interval);
    stopTimer(timerId);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(callback).not.toHaveBeenCalled();
});