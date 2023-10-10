import Sky from './Sky';
import Land from './Land';
import Pipes from './Pipes';
import Bird from './Bird';


export default class Game {
    public width: number = 800; // 游戏舞台的宽度
    public height: number = 600; // 游戏舞台的高度
    public dom: HTMLElement = document.getElementById('game') as HTMLElement; // 获取 dom 元素
    public maxHeight: number = 600 - 112; // 能活动的最大高度，游戏高度减去大地的高度
    public paused: boolean = true; // 当前游戏是否暂停
    public score: number = 0; // 游戏的得分
    public isGameOver: boolean = false; // 判断游戏是否结束，后面我们会根据这个属性来判断用户按的回车是重新开始还是暂停
    // 游戏开始，回头只要一调用 game.start 方法，游戏就开始了
    // 游戏开始其实就是调用所有对象的 start 方法
    start(sky: Sky, land: Land, pipes: Pipes, bird: Bird): void {
        sky.timer.start();
        land.timer.start();
        pipes.produceTimer.start();
        pipes.moveTimer.start();
        bird.wingTimer.start();
        bird.dropTimer.start();
        this.paused = false;
    }
    // 游戏结束方法，其实就是调用其他对象的 stop 方法
    stop(sky: Sky, land: Land, pipes: Pipes, bird: Bird): void {
        sky.timer.stop();
        land.timer.stop();
        pipes.produceTimer.stop();
        pipes.moveTimer.stop();
        bird.wingTimer.stop();
        bird.dropTimer.stop();
        this.paused = true;
    }
    // 检测是否能够获取到分数
    getScore(pipes: Pipes, bird: Bird): void {
        // 遍历所有的柱子
        for (let i = 0; i < pipes.all.length; i++) {
            let p = pipes.all[i]; // 获取当前的柱子
            if ((bird.left > (p.left + p.width)) && !p.pass) {
                p.pass = true; // 说明当前的这根柱子已经计过分
                this.score += 0.5; // 因为有上下两根柱子，而遍历的是所有的柱子，所以一次只增加 0.5 分
                (document.querySelector('#game .score') as HTMLElement).innerHTML = this.score.toString();
            }
        }
    }
    // 检测是否发生碰撞，如果碰撞，则游戏结束
    gameOver(sky: Sky, land: Land, pipes: Pipes, bird: Bird): void {
        // 游戏结束一共分为两种情况（1）小鸟撞到了地面 （2）小鸟和柱子相撞
        // 小鸟撞到了地面
        if (bird.top === this.maxHeight - bird.height) {
            this.stop(sky, land, pipes, bird); // 停止游戏
            (document.querySelector('#game .score') as HTMLElement).style.display = 'none';
            (document.querySelector('#game .over') as HTMLElement).innerHTML += this.score;
            (document.querySelector('#game .over') as HTMLElement).style.display = 'block';
            this.isGameOver = true;
            return;
        }
        // 小鸟是否碰撞到柱子
        let bx: number = bird.left + bird.width / 2; // 获取小鸟 x 轴方向的中心点
        let by: number = bird.top + bird.height / 2; // 获取小鸟 y 轴方向的中心点
        // 接下来我们需要去遍历所有的柱子，判断小鸟是否和柱子碰撞
        for (let i = 0; i < pipes.all.length; i++) {
            let p = pipes.all[i];// 获取当前的柱子
            // 接下来来检测两个矩形是否碰撞
            // 横向 ： |矩形1x中心点到矩形2x中心点距离| < 两个矩形宽度之和/2
            // 纵向 ： |矩形1y中心点到矩形2y中心点距离| < 两个矩形高度之和/2
            let px: number = p.left + p.width / 2; //  柱子 x轴方向的中心点
            let py: number = p.top + p.height / 2; //  柱子 y轴方向的中心点
            if (Math.abs(bx - px) < (p.width + bird.width) / 2 && Math.abs(by - py) < (p.height + bird.height) / 2) {
                this.stop(sky, land, pipes, bird); // 停止游戏
                (document.querySelector('#game .score') as HTMLElement).style.display = 'none';
                (document.querySelector('#game .over') as HTMLElement).innerHTML += this.score;
                (document.querySelector('#game .over') as HTMLElement).style.display = 'block';
                this.isGameOver = true;
                return;
            }
        }
    }
}