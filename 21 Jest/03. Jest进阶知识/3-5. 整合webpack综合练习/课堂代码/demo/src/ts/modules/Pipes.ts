import getTimer from './util'
import { getTimerType, pipeType } from '../types/type'
import Game from './Game';
import Bird from './Bird';
import Sky from './Sky';
import Land from './Land';

export default class Pipes {
    public width: number = 52; // 柱子的宽度
    // 获取随机数的方法
    public getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    public all: pipeType[] = []; // 保存所有的柱子
    public game: Game; // game 对象
    public bird: Bird; // 小鸟对象
    public sky: Sky; // 天空对象
    public land: Land; // 大地对象
    constructor(game: Game, bird: Bird, sky: Sky, land: Land) {
        this.game = game;
        this.bird = bird;
        this.sky = sky;
        this.land = land;
    }
    // 创建柱子方法
    createPair(game: Game): void {
        const minHeight: number = 60,   // 柱子的最小高度
            gap: number = 150,      // 柱子中间的缝隙
            maxHeight: number = game.maxHeight - gap - minHeight;   // 柱子的最高高度
        // 接下来来确定一组柱子
        const h1: number = this.getRandom(minHeight, maxHeight);
        const h2: number = game.maxHeight - h1 - gap;
        // 创建上方的柱子
        const div1: HTMLElement = document.createElement('div');
        div1.className = 'pipeup';
        div1.style.height = h1 + 'px';
        div1.style.left = game.width + 'px'
        // 将上方柱子添加到页面上面
        game.dom.appendChild(div1);
        // 还需要将这个柱子添加数组里面，方便后面判断操作
        this.all.push({
            dom: div1, // dom 属性指向当前的 div
            height: h1,
            width: this.width,
            top: 0,
            left: game.width,
            pass: false
        })
        // 创建下方的柱子
        const div2: HTMLElement = document.createElement('div');
        div2.className = 'pipedown';
        div2.style.height = h2 + 'px';
        div2.style.left = game.width + 'px'
        // 将下方柱子添加到页面上面
        game.dom.appendChild(div2);
        // 还需要将这个柱子添加数组里面，方便后面判断操作
        this.all.push({
            dom: div2, // dom 属性指向当前的 div
            height: h2,
            width: this.width,
            top: h1 + gap, // 下方柱子的 top 值 = 上面柱子的高度 + 空隙
            left: game.width,
            pass: false
        })
    }
    // 生产柱子的计时器
    produceTimer: getTimerType = getTimer(2500, this, () => {
        this.createPair(this.game);
    });
    // 柱子移动的计时器
    // 主要逻辑：（1）遍历所有的柱子，left 减 2 来进行移动 （2）每次移动完之后，需要判断一下柱子是否跑出了舞台之外，如果抛出，将该柱子移除
    moveTimer: getTimerType = getTimer(30, this, () => {
        for (let i = 0; i < this.all.length; i++) {
            const p: pipeType = this.all[i];  // 得到当前的柱子
            p.left -= 2; // 通过修改 left 的值来让柱子进行移动
            if (p.left < -p.width) {
                // 如果进入到此 if，说明柱子已经移动到了舞台之外
                p.dom.remove(); // 从屏幕上面移除
                this.all.splice(i, 1); // 从数组中删除该柱子
                i--;
            } else {
                // 如果进入 else，说明柱子没有抛出舞台
                p.dom.style.left = p.left + 'px';
            }
        }
        this.game.getScore(this, this.bird); // 每次柱子移动一次，就需要判断一下玩家是否得分
        this.game.gameOver(this.sky, this.land, this, this.bird); // 每次柱子移动一次，也同样需要判断一下游戏是否结束
    });
}