import Game from "./modules/Game";
import Sky from "./modules/Sky";
import Land from "./modules/Land";
import Pipes from "./modules/Pipes";
import Bird from "./modules/Bird";

import "../css/index.css";

// 游戏初始化函数
function init(): void {
  // 实例化各个对象
  const sky: Sky = new Sky();
  const land: Land = new Land();
  const game: Game = new Game();
  const bird: Bird = new Bird(game);
  const pipes: Pipes = new Pipes(game, bird, sky, land);
  // 绑定键盘事件
  document.documentElement.onkeydown = function (e) {
    if (e.key === " ") {
      bird.jump(); // 如果用户按的是空格，就往上移动一段距离
    } else if (e.key === "Enter") {
      // 如果用户按的是回车，分为两种情况（1）游戏结束，需要重新加载此页面开始游戏 （2）游戏没有结束，用户只是想要暂停
      if (game.isGameOver) {
        location.reload();
      } else {
        if (game.paused) {
          game.start(sky, land, pipes, bird);
        } else {
          game.stop(sky, land, pipes, bird);
        }
      }
    }
  };
}
init();
