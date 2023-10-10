import Bird from "../src/ts/modules/Bird";
import Game from "../src/ts/modules/Game";

jest.mock("../src/ts/modules/Game", () => {
  return jest.fn().mockImplementation(() => ({}));
});

test("测试show方法", () => {
  // 准备测试数据
  const game = new Game();
  const bird = new Bird(game);
  bird.top = 100;
  const mockDom = {
    style: {
      top: "",
    },
  };
  bird.dom = mockDom as HTMLElement;
  // show方法的测试重点在于有没有根据最新的wingIndex设置backgroundPosition
  bird.show();
  // 断言
  expect(bird.dom.style.top).toBe("100px");
  bird.wingIndex = 0;
  bird.show();
  expect(bird.dom.style.backgroundPosition).toBe("-8px -10px");
  bird.wingIndex = 1;
  bird.show();
  expect(bird.dom.style.backgroundPosition).toBe("-60px -10px");
  bird.wingIndex = 2;
  bird.show();
  expect(bird.dom.style.backgroundPosition).toBe("-113px -10px");
});

test("测试setTop方法", () => {
  // 准备测试数据
  const game = new Game();
  game.maxHeight = 600 - 112;
  const bird = new Bird(game);
  bird.top = 100;
  bird.height = 26;
  // setTop方法的测试重点在于有没有对设置的值进行边界判断
  // 调用被测试方法
  bird.setTop(-100);
  expect(bird.top).toBe(0);
  bird.setTop(600);
  expect(bird.top).toBe(600 - 112 - 26);
  bird.setTop(100);
  expect(bird.top).toBe(100);
});

// 测试 Bird 类的 jump 方法
test("测试 Bird 类的 jump 方法", () => {
  // 准备测试数据
  const game = new Game();
  const bird = new Bird(game);
  bird.speed = 0;
  // 测试重点在于有没有改变 speed
  // 调用被测试方法
  bird.jump();
  // 断言
  expect(bird.speed).toBe(-0.5);
});

// 测试wingTimer
test("测试 wingTimer", () => {
  // 准备测试数据
  const game = new Game();
  const bird = new Bird(game);
  const mockDom = {
    style: {
      top: "",
    },
  };
  bird.dom = mockDom as HTMLElement;
  bird.show = jest.fn();
  jest.useFakeTimers(); // 开启时间模拟

  // 调用被测试方法
  bird.wingTimer.start(); // 启动计时器
  jest.advanceTimersByTime(100); // 时间推进 100ms

  // 断言
  expect(bird.wingIndex).toBe(1);
  expect(bird.show).toHaveBeenCalled();

  // 清理测试环境
  bird.wingTimer.stop(); // 停止计时器
  expect(bird.wingIndex).toBe(1);
  jest.useRealTimers(); // 关闭时间模拟
});

// 测试 dropTimer
test("测试 dropTimer", () => {
  // 准备测试数据
  const game = new Game();
  const bird = new Bird(game);
  const mockDom = {
    style: {
      top: "",
    },
  };
  bird.dom = mockDom as HTMLElement;
  bird.top = 150;
  bird.show = jest.fn();
  jest.useFakeTimers(); // 开启时间模拟

  // 调用被测试方法
  bird.dropTimer.start(); // 启动计时器
  jest.advanceTimersByTime(16); // 时间推进 16ms

  // 断言
  expect(bird.top).not.toBe(150);
  expect(bird.speed).not.toBe(0);
  expect(bird.show).toHaveBeenCalled();

  // 清理测试环境
  bird.dropTimer.stop(); // 停止计时器
  jest.useRealTimers(); // 关闭时间模拟
});
