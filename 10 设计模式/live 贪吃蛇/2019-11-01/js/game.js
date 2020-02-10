/*
    这个文件用来处理整个游戏玩法的逻辑
 */
var game = new Game();
game.timer = null;
game.score = 0;
game.init = function () {
    ground.init();
    snake.init();
    // 初始化食物
    createFood();
    // 绑定事件
    // next hit dealy
    // 你不知道的js 防抖节流  throttle
    document.onkeydown = function (e) {
        //console.log(snake);
        // e.which 37 left 38 top 39 right 40 down
        if (e.which == 37 && snake.direction != directionNum.right) {   //蛇往右走的时候不能按左键
            snake.direction = directionNum.left;
        } else if (e.which == 38 && snake.direction != directionNum.bottom) {   //往下走的时候不能按上键
            snake.direction = directionNum.top;
        } else if (e.which == 39 && snake.direction != directionNum.left) {      //往左走的时候不能按右键
            snake.direction = directionNum.right;
        } else if (e.which == 40 && snake.direction != directionNum.up) {   //往上走的时候不能按下键
            snake.direction = directionNum.bottom;
        }
    };

    var oBtn = document.getElementById('btn');
    oBtn.onclick = function () {
        game.start();
    }
};

game.start = function () {
    this.timer = setInterval(function () {
        snake.getCollideSquare()    //获取碰撞的方块=>移动
    }, intervalTime);
};

game.over = function () {
    clearInterval(this.timer);
    alert(this.score);
};

game.init();

//创建食物
function createFood() {
    //要根据坐标创建食物，并且不能在蛇身上以及围墙上
    var x = null;
    var y = null;

    var flag = true;    //循环跳出的条件
    while (flag) {
        /*
            1、坐标不能在围墙上，x不能等于0，也不能等于td-1。只能为1-28。y也一样 
            2、x-y的随机数：Math.round(Math.random()*(y-x) + x)
                Math.round(Math.random()*27 + 1)
         */
        
        //1 + Math.floor(Math.random() * 28)
        x = Math.round(Math.random()*(td-3) + 1);
        y = Math.round(Math.random()*(tr-3) + 1);
        var ok = true;  //停止for循环的变量
        for (var node = snake.head; node; node = node.next) {
            //循环蛇身上方块。从蛇头循环到蛇尾（倒着走）。第二个参数表示的意思为，如果节点存在，循环就会一直走
            if (x == node.x && y == node.y) {
                ok = false;
                break;
            }
        };
        if (ok) {   //如果for循环停了，那while循环也停了吧
            flag = false;

            //for循环如果没走（表示这个坐标没在蛇身上）的话，while就会停了
        }
    };

    var food=SquareFactory.create('Food',x,y,'red');
    ground.remove(food.x,food.y);
    ground.append(food);
}