import getTimer from './util'
import { getTimerType } from '../types/type'


export default class Land {
    left: number = 0;
    dom: HTMLElement = document.querySelector('#game .land') as HTMLElement;
    constructor() { }
    // 重新展示大地这张背景图
    show(): void {
        this.dom.style.left = this.left + 'px'
    }
    timer: getTimerType = getTimer(30, this, () => {
        // 不停的修改 left 值
        this.left -= 2;
        if (this.left === -800) {
            this.left = 0;
        }
        this.show();
    })
}