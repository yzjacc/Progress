// 游戏场景 宽度系数-每行有多少个方块       高度系数 - 控制一共多少行
var XLEN = 30;
var YLEN = 30;

// 每个方块多宽
var SQUAREWIDTH = 20;


// 游戏场景的位置 
var BASE_X_PONIT = 200;
var BASE_Y_POINT = 100;


// 定义 蛇的移动时间间隔
var INTERVAL = 300;


// 定义方块
function Square (x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
};

Square.prototype.touch = function () {
    console.log('touch');
};

var Floor = tool.extends(Square);
var Stone = tool.extends(Square);
var Food = tool.single(Square);
var SnakeHead = tool.single(Square);
var SnakeBody = tool.extends(Square);
var Ground = tool.single(Square);