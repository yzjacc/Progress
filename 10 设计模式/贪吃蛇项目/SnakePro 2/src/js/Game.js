var oGame = new Game();
oGame.timer = null;
oGame.score = 0;
oGame.init = function () {
    oGround.init();
    oSnake.init(oGround);
    // 初始化食物
    createFood(oGround);
    // 绑定事件
    // next hit dealy
    // 你不知道的js 防抖节流  throttle
    document.onkeydown = function (e) {
        // e.which 37 left 38 top 39 right 40 down

        if (e.which == 37 && oSnake.direction != DIRECTIONENUM.RIGHT) {
            oSnake.direction = DIRECTIONENUM.LEFT;
        }else if (e.which == 38 && oSnake.direction != DIRECTIONENUM.DOWN) {
            oSnake.direction = DIRECTIONENUM.UP;
        }else if (e.which == 39 && oSnake.direction != DIRECTIONENUM.LEFT) {
            oSnake.direction = DIRECTIONENUM.RIGHT;
        }else if (e.which == 40 && oSnake.direction != DIRECTIONENUM.UP) {
            oSnake.direction = DIRECTIONENUM.DOWN;
        }
    };

    var oBtn = document.getElementById('btn');
    oBtn.onclick = function () {
        oGame.start();
    }
};

oGame.start = function () {
    this.timer = setInterval(function () {
        oSnake.move(oGround);
    }, INTERVAL);
};

oGame.over = function () {
    clearInterval(this.timer);
    alert(this.score);
};

oGame.init();


function createFood (ground) {
    var x = null;
    var y = null;
    var flag = true;
    while (flag) {
        x = 1 +  Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        var ok = true;
        for (var node = oSnake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                ok = false;
                break;
            }
        };
        if (ok) {
            flag = false;
        }
    };
    var oFood = SquareFactory.create('Food', x, y, 'red');
    ground.remove(oFood.x, oFood.y);
    ground.append(oFood);
};





