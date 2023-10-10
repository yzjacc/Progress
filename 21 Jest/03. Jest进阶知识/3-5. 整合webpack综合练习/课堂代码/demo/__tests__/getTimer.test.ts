import getTimer from "../src/ts/modules/util";

describe("测试getTimer",()=>{
    let timer:ReturnType<typeof getTimer>;

    beforeEach(()=>{
        jest.useFakeTimers();
    });
    afterEach(()=>{
        jest.clearAllTimers(); // 清除所有的计时器
        jest.useRealTimers();
    });

    test("timer开始和结束是否正确",()=>{
        const callback = jest.fn();
        const setInterval = jest.spyOn(window, "setInterval");
        const timer = getTimer(1000, {}, callback);
        timer.start();
        // 接下来开始断言测试
        jest.advanceTimersByTime(500);
        expect(setInterval).toBeCalledTimes(1);
        jest.advanceTimersByTime(500);
        expect(setInterval).toBeCalledTimes(1);
        jest.advanceTimersByTime(3000);
        expect(setInterval).toBeCalledTimes(1);
        timer.stop();
        timer.start();
        jest.advanceTimersByTime(500);
        expect(setInterval).toBeCalledTimes(2);
        jest.advanceTimersByTime(500);
        expect(setInterval).toBeCalledTimes(2);
        jest.advanceTimersByTime(3000);
        expect(setInterval).toBeCalledTimes(2);
        timer.stop();
    });

    test("测试callback调用是否正常",()=>{
        const callback = jest.fn();
        const setInterval = jest.spyOn(window, "setInterval");
        const timer = getTimer(1000, {}, callback);
        timer.start();

        expect(callback).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(2000);
        expect(callback).toHaveBeenCalledTimes(3);

        timer.stop();
        expect(callback).toHaveBeenCalledTimes(3);
        jest.advanceTimersByTime(2000);
        expect(callback).toHaveBeenCalledTimes(3);
    });
});