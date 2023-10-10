import getTimer from "./util";
import { getTimerType } from "../types/type";

export default class Sky {
  left: number = 0;
  dom: HTMLElement = document.querySelector("#game .sky") as HTMLElement;
  constructor() {}
  show(): void {
    // 重新展示天空这张背景图
    this.dom.style.left = this.left + "px";
  }
  timer: getTimerType = getTimer(30, this, () => {
    // 不停修改 left 值
    this.left -= 1;
    if (this.left === -800) {
      this.left = 0;
    }
    this.show();
  });
}
