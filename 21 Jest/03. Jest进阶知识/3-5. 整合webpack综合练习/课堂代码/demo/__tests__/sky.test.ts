import Sky from "../src/ts/modules/Sky";

test("测试构造函数是否正常",()=>{
    const sky = new Sky();
    expect(sky).toBeDefined();
    expect(sky.left).toBe(0);
    expect(sky.dom).toBeDefined();
});

test("测试show方法是否工作正常",()=>{
    const sky = new Sky();
    const mockDom = {
        style : {
            left : ""
        }
    }
    sky.dom = mockDom as HTMLElement;

    sky.left = 100;
    sky.show();

    // 断言
    expect(mockDom.style.left).toEqual("100px");
});

test("测试定时器的回调是否正常",()=>{
    jest.useFakeTimers();
    const sky = new Sky();
    const mockDom = {
        style : {
            left : ""
        }
    }
    sky.dom = mockDom as HTMLElement;

    sky.left = 0;
    sky.timer.start();
    jest.advanceTimersByTime(300);
    expect(sky.left).toEqual(-10);
    expect(mockDom.style.left).toEqual("-10px");
    sky.timer.stop();
    jest.advanceTimersByTime(3000);
    expect(sky.left).toEqual(-10);
    expect(mockDom.style.left).toEqual("-10px");
});

test("测试left是否能够归零",()=>{
    jest.useFakeTimers();
    const sky = new Sky();
    const mockDom = {
        style : {
            left : ""
        }
    }
    sky.dom = mockDom as HTMLElement;

    sky.timer.start();

    jest.advanceTimersByTime(24000);

    sky.timer.stop();
    expect(sky.left).toEqual(0);
    expect(mockDom.style.left).toEqual("0px");

});