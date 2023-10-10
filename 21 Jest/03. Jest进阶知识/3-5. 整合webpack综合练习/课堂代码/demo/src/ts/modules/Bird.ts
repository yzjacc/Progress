import getTimer from "./util";
import { getTimerType } from "../types/type";
import Game from "./Game";

export default class Bird {
  public width: number = 33; // 小鸟图片的宽度
  public height: number = 26; // 小鸟图片的高度
  public top: number = 150; // 默认游戏开始时 top 值
  public left: number = 200; // 默认游戏开始时 left 值
  public dom: HTMLElement = document.querySelector(
    "#game .bird"
  ) as HTMLElement; // 获取小鸟图片的 div dom 元素
  public wingIndex: number = 0; // 记录当前小鸟的图片索引，翅膀是处于哪个位置
  public speed: number = 0; // 初始速度，向下的速度，每毫秒移动的像素值
  public a: number = 0.002; // 加速度
  public game: Game; // game 对象
  constructor(game: Game) {
    this.game = game;
  }
  // 显示小鸟的方法
  show(): void {
    // 设置新的 top 值
    this.dom.style.top = this.top + "px";
    // 根据图片的索引值，来决定背景图的位置
    if (this.wingIndex === 0) {
      this.dom.style.backgroundPosition = "-8px -10px";
    } else if (this.wingIndex === 1) {
      this.dom.style.backgroundPosition = "-60px -10px";
    } else {
      this.dom.style.backgroundPosition = "-113px -10px";
    }
  }
  // 设置小鸟 top 值的方法
  setTop(newTop: number): void {
    if (newTop < 0) {
      newTop = 0;
    } else if (newTop > this.game.maxHeight - this.height) {
      newTop = this.game.maxHeight - this.height;
    }
    this.top = newTop;
  }
  // 小鸟的跳跃方法，其实就是将下落的速度修改为负值，这样的话就可以反方向的移动一段距离
  // 但是因为加速度是正值，所以向上移动一段距离后，就会重新开始下落
  jump(): void {
    this.speed = -0.5;
  }
  // 小鸟的第一个计时器，不停的变换小鸟的背景图，呈现出小鸟在飞行的视觉效果
  wingTimer: getTimerType = getTimer(100, this, () => {
    this.wingIndex = (this.wingIndex + 1) % 3; // 重新计算当前应该显示小鸟图片的索引
    this.show(); // 调用 show 方法来重新显示当前的小鸟图片
  });
  // 小鸟的第二个计时器，控制这个小鸟不停的下落，实际上就是在不停的修改 top 值
  // 涉及到一个物理里面的匀加速运动  S = vt + 1/2 * a * t * t
  // 获取匀加速一段时间后的末速度  假设初始速度为 v0，加速度为 a 的情况下，物体运行了 t 时间后，末速度为 v = v0 + a * t
  dropTimer: getTimerType = getTimer(16, this, () => {
    // 每过 16 毫秒，就需要去计算小鸟现在的向下位移情况
    let s = this.speed * 16 + 0.5 * this.a * 16 * 16;
    this.setTop(this.top + s); // 重新设置小鸟的 top 值
    this.speed = this.speed + this.a * 16; // 更新当前向下的速度
    this.show();
  });
}
