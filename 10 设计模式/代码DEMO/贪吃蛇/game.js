// 棋盘的宽度和高度（广场）
var X_LEN = 30;
var Y_LEN = 30;
// 小格子宽度
var SQUARE_WIDTH = 20;
// 棋盘坐标
var BASE_X = 100;
var BASE_Y = 100;
// 蛇的速度
var SPEED = 500;
// 方格基本对象
function Square(x1, y1) {
    this.x = x1;
    this.y = y1;
    this.view = null;
    this.width = SQUARE_WIDTH;
    this.height = SQUARE_WIDTH
}
Square.prototype.touch = function() {}
    // 地板继承方格
var Floor = JsUtil.extends(Square);
// 障碍物
var Stone = JsUtil.extends(Square);
// 墙继承方法
var Wall = JsUtil.extends(Stone);
// 蛇身体继承方法
var SnackBody = JsUtil.extends(Square)
    // 蛇头继承方法
var SnackHead = JsUtil.extends(Square)

var Snack = JsUtil.single();
var Ground = JsUtil.single();
var Game = JsUtil.single();

// 触及方法的枚举
var TouchEventEnum = {
    Move: 'Move',
    EAT: 'Eat',
    DEAD: 'Dead'
}

var game = new Game();
// 游戏分数
game.score = 0;
// 设置时间点的
game.timer = null;
// 地板
game.ground = null;
// 蛇
game.snack = null;
// 食物
game.food = null;
// 初始化
game.init = function() {
        // 初始广场
        var gameGround = new Ground()
            // 初始化
        gameGround.init();
        this.ground = gameGround;

        // 初始化蛇
        var gameSnack = new Snack();
        gameSnack.init(gameGround);
        this.snack = gameSnack;

    }
    // 运行游戏方法
game.run = function() {
        this.timer = setInterval(function() {
            var result = game.snack.move(game)
        }, SPEED)

        // 上下左右
        document.onkeydown = function(e) {
            var keyNum = window.event ? e.keyCode : e.which;
            if (keyNum === 38 && game.snack.direction != DirectionEnum.DOWN) {
                game.snack.direction = DirectionEnum.UP
            } else if (keyNum === 40 && game.snack.direction != DirectionEnum.UP) {
                game.snack.direction = DirectionEnum.DOWN
            } else if (keyNum === 37 && game.snack.direction != DirectionEnum.RIGHT) {
                game.snack.direction = DirectionEnum.LEFT
            } else if (keyNum === 39 && game.snack.direction != DirectionEnum.LEFT) {
                game.snack.direction = DirectionEnum.RIGHT
            }
        }
        var result = game.snack.move(game)
    }
    // 游戏结束方法
game.over = function() {
    console.log('你的得分：' + this.score)
}

// 初始化一个广场
var ground = new Ground();

ground.squareTable = new Array(Y_LEN);
ground.xLen = X_LEN;
ground.yLen = Y_LEN;

ground.basePointX = BASE_X;
ground.basePointY = BASE_Y;
// 广场视图
ground.view = null;

ground.init = function() {
        var viewGround = document.createElement('div');
        viewGround.style.position = 'relative'
        viewGround.style.height = this.xLen * SQUARE_WIDTH + 'px';
        viewGround.style.width = this.yLen * SQUARE_WIDTH + 'px';
        viewGround.style.display = 'inline-block'
        viewGround.style.left = this.basePointX + 'px'
        viewGround.style.top = this.basePointY + 'px'

        viewGround.style.background = 'green';
        document.body.appendChild(viewGround);
        // x = 0 y = 0 x = max y = max
        for (var i = 0; i < this.yLen; i++) {
            for (var j = 0; j < this.xLen; j++) {
                var square;
                if (j === 0) {
                    this.squareTable[i] = new Array(this.X_LEN)
                }
                if (i === 0 || j === 0 || i === this.yLen - 1 || j === this.xLen - 1) {
                    square = SquareFactory.create('Wall', j, i) //造墙方法
                } else {
                    // 横坐标是内层，纵坐标是外层
                    square = SquareFactory.create("Floor", j, i) //造地板方法
                }
                this.squareTable[i][j] = square;
                viewGround.appendChild(square.view)
            }
        }
        this.view = viewGround
    }
    // 拆地板
ground.remove = function(x, y) {
        // view
        this.view.removeChild(this.squareTable[y][x].view)
            // 数据上
        this.squareTable[y][x] = null
    }
    // 添加的方法
ground.append = function(x, y, square) {
    this.squareTable[y][x] = square;
    this.view.appendChild(this.squareTable[y][x].view)
}




function SquareFactory() {}
SquareFactory.create = function(type, x, y) {
        if (typeof SquareFactory[type] !== 'function') {
            throw "Error"
        }
        var result = SquareFactory[type](x, y)
        return result;
    }
    // floor x y color touch
SquareFactory.commonInit = function(obj, x1, y1, color, touchEvent) {
        obj.x = x1;
        obj.y = y1;
        obj.view = document.createElement('div');
        obj.view.style.position = 'absolute';
        obj.view.style.display = 'inline-block';
        obj.view.style.width = SQUARE_WIDTH + 'px';
        obj.view.style.height = SQUARE_WIDTH + 'px';
        obj.view.style.background = color;
        obj.view.style.left = obj.x * SQUARE_WIDTH + 'px';
        obj.view.style.top = obj.y * SQUARE_WIDTH + 'px';
        obj.touch = function() {
            return touchEvent;
        }
    }
    // 我们需要这个工厂，给咱们创造：floor food wall snackHead snackBody
SquareFactory.Floor = function(x1, y1) {
        var floor = new Floor();
        // 造对应小方块的方法
        this.commonInit(floor, x1, y1, "orange", TouchEventEnum.Move)
        return floor
    }
    // 造食物
SquareFactory.Food = function(x1, y1) {
        var food = new Food();
        // 造对应小方块的方法
        this.commonInit(food, x1, y1, "green", TouchEventEnum.EAT)
        return food
    }
    // 造墙
SquareFactory.Wall = function(x1, y1) {
        var wall = new Wall();
        // 造对应小方块的方法
        this.commonInit(wall, x1, y1, "black", TouchEventEnum.DEAD)
        return wall
    }
    // 造蛇头
SquareFactory.SnackHead = function(x1, y1) {
        var snackHead = new SnackHead();
        // 造对应小方块的方法
        this.commonInit(snackHead, x1, y1, "red", TouchEventEnum.DEAD)
        return snackHead
    }
    // 造蛇身子
SquareFactory.SnackBody = function(x1, y1) {
        var snackBody = new SnackBody();
        // 造对应小方块的方法
        this.commonInit(snackBody, x1, y1, "blue", TouchEventEnum.DEAD)
        return snackBody
    }
    // 造蛇的方法
    // 指针
var snack = new Snack();
snack.head = null;
snack.tail = null;
snack.direction = 0;
var DirectionEnum = {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 }
    }
    // 蛇初始化
snack.init = function(gameGround) {
    var tempHead = SquareFactory.create('SnackHead', 3, 1);
    var tempBody1 = SquareFactory.create('SnackBody', 2, 1);
    var tempBody2 = SquareFactory.create('SnackBody', 1, 1);
    // 拆地板方法，添加方法
    gameGround.remove(3, 1)
    gameGround.append(3, 1, tempHead)
    gameGround.remove(2, 1)
    gameGround.append(2, 1, tempBody1)
    gameGround.remove(1, 1)
    gameGround.append(1, 1, tempBody2)
        // 把蛇链接起来
    tempHead.next = tempBody1
    tempHead.last = null;
    tempBody1.next = tempBody2;
    tempBody1.last = tempHead;
    tempBody2.next = null;
    tempBody2.last = tempBody1;
    this.head = tempHead;
    this.tail = tempBody2;
    this.direction = DirectionEnum.RIGHT;
}
snack.move = function(game) {
    // 蛇怎么动
    // 蛇头移动方法
    var square = game.ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x]
        // 蛇的动作策略
    if (typeof this.strategy[square.touch()] === 'function') {
        this.strategy[square.touch()](game, this, square, false)
    }
}
snack.strategy = {
    Move: function(game, snack, square, fromEat) {
        // 用js实现以下链表的插入
        // 系统能力的重要性，一期，二期还是继续打补丁
        // 重构，教你一种设计代码结构的能力
        // 拿到需求  做详细设计  自测
        // 拆地板
        var tempHead = snack.head.next;
        var newBody = SquareFactory.create('SnackBody', snack.head.x, snack.head.y)
        newBody.next = tempHead;
        tempHead.last = newBody;
        tempHead = newBody
        game.ground.remove(snack.head.x, snack.head.y);
        game.ground.append(tempHead.x, tempHead.y, tempHead);
        // 长出新的头
        var newHead = SquareFactory.create('SnackHead', square.x, square.y);
        newHead.next = tempHead;
        tempHead.last = newHead;
        game.ground.remove(square.x, square.y)
        game.ground.append(square.x, square.y, newHead);
        snack.head = newHead;
        snack.head.last = null;
        // 删除尾巴
        if (!fromEat) {
            var floor = SquareFactory.create("Floor", snack.tail.x, snack.tail.y);
            game.ground.remove(floor.x, floor.y);
            game.ground.append(floor.x, floor.y, floor)
            snack.tail = snack.tail.last;
            snack.tail.next = null;
        }
    },
    Eat: function(game, snack, square) {
        game.score++;
        this.Move(game, snack, square, true);
        var food = new Food();
        food.init(game.ground, game)
    },
    Dead: function(game) {
        game.over()
    }
}

// 吃食物，你的有个食物