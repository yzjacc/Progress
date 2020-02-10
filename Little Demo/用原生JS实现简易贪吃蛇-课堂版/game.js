/**
 * 配置对象
 */
var config = {
    gameContainer: document.querySelector(".game"), //整个游戏的容器
    size: 10, //每一个小格的尺寸（像素）
    maxX: 49, //最大的虚拟横坐标
    maxY: 49, //最大的虚拟纵坐标
}

/**
 * 用于创建一个蛇身体的一部分
 * x,y分别表示虚拟横纵坐标
 */
function SnakeItem(x, y) {
    this.x = x;
    this.y = y;
    this.dom = document.createElement("div"); //创建一个dom对象
    config.gameContainer.appendChild(this.dom);
    this.prev = null; //之前的身体
    this.next = null; //之后的身体
    this.show();
}

/**
 * 设置当前这个块儿之前的块儿
 */
SnakeItem.prototype.setPrevItem = function (prevItem) {
    this.prev = prevItem;
    prevItem.next = this;
}

SnakeItem.prototype.setNextItem = function (nextItem) {
    this.next = nextItem;
    nextItem.prev = this;
}

/**
 * 显示蛇
 */
SnakeItem.prototype.show = function () {
    this.dom.style.left = this.x * config.size + "px";
    this.dom.style.top = this.y * config.size + "px";
}

/**
 * 移动当前块，到前方块的位置
 */
SnakeItem.prototype.moveForward = function () {
    //让自己的尾巴往前跑
    if (this.next) {
        //后面有小块
        this.next.moveForward();
    }
    //自己往前跑，将自己的坐标设置为前面那个小块儿的坐标
    if (this.prev) {
        //前面有小块儿
        this.setPosition(this.prev.x, this.prev.y);
    }
}

/**
 * 重新设置坐标
 */
SnakeItem.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
    this.show();
}


/**
 * 蛇
 */
function Snake(length) {
    this.length = length; //蛇的长度
    this.direction = "right"; //left right up down
    this.timer = null; //自动移动的计时器
    //初始化蛇的身体，每一段身体是一个SnakeItem对象
    var curItem = null;
    for (var i = 0; i < length; i++) {
        var item = new SnakeItem(i, 0);
        if (curItem !== null) {
            curItem.setPrevItem(item);
        }
        curItem = item;
        //设置头部
        if (i === length - 1) {
            //最后一次循环
            this.head = item; //用属性记录头部
            this.head.dom.className = "head";
        }
    }
}
/**
 * 向当前方向上移动一步
 */
Snake.prototype.moveNext = function () {
    var pos = this.getNextPosition();//得到头部在当前方向上的下一个坐标
    if (!this.isCanMove(pos)) {
        //不能移动，游戏结束
        gameOver();
        return;
    }
    this.head.moveForward();
    this.head.setPosition(pos.x, pos.y);
}

/**
 * 判断给定的位置是否可以移动
 */
Snake.prototype.isCanMove = function (pos) {
    if (pos.x < 0 || pos.x > config.maxX || pos.y < 0 || pos.y > config.maxY) {
        return false; //超过范围
    }
    var item = this.head;
    while (item = item.next) {
        if (item.x === pos.x && item.y === pos.y) {
            return false;
        }
    }

    return true;
}

/**
 * 添加一个块
 */
Snake.prototype.add = function () {
    this.length++;
    var item = new SnakeItem(-1, -1);
    //找到尾巴
    var tail = this.head;
    while (tail.next) {
        tail = tail.next;
    }
    tail.setNextItem(item);
}

/**
 * 切换方向
 */
Snake.prototype.changeDirection = function (newDirection) {
    var allows; //用户记录当前有哪些方向是允许的
    if (this.direction === "left" || this.direction === "right") {
        allows = ["up", "down"];
    }
    else {
        allows = ["left", "right"];
    }
    if (allows.includes(newDirection)) {
        //数组中是否包含newDirection
        this.direction = newDirection;
    }
}

/**
 * 用于得到当前方向上下一个坐标
 */
Snake.prototype.getNextPosition = function () {
    var pos = {
        x: this.head.x,
        y: this.head.y
    }
    if (this.direction === "right") {
        pos.x++;
    }
    else if (this.direction === "left") {
        pos.x--;
    }
    else if (this.direction === "up") {
        pos.y--;
    }
    else {
        pos.y++;
    }
    return pos;
}

Snake.prototype.autoMove = function () {
    clearInterval(this.timer); //为了避免重复调用，先清空计时器
    var that = this;
    this.timer = setInterval(function () {
        that.moveNext();
    }, 300);
}

Snake.prototype.stop = function () {
    clearInterval(this.timer);
}

var s = new Snake(10);
s.autoMove();

window.onkeydown = function (e) {
    if (e.key === "ArrowUp") {
        s.changeDirection("up");
        s.moveNext();
    }
    else if (e.key === "ArrowDown") {
        s.changeDirection("down");
        s.moveNext();
    }
    else if (e.key === "ArrowLeft") {
        s.changeDirection("left");
        s.moveNext();
    }
    else if (e.key === "ArrowRight") {
        s.changeDirection("right")
        s.moveNext();
    }
}

/**
 * 游戏结束
 */
function gameOver() {
    console.log("游戏结束")
    window.onkeydown = null;
    s.stop();
}