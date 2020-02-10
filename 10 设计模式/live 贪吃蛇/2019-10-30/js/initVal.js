/*
    这个文件里存放一些全局性的东西
        1、常用的变量
        2、方块的构造函数
        3、根据方块的构造函数，创建各个元素对象（蛇头、食物、。。。）
        4、存储蛇头与其它方块碰撞后的处理方式
 */

//游戏区域的大小
var td=30;  //宽度，列数（单位为一个格子）
var tr=30;  //高度，行数

//方块的大小
var squareWidth=20;

//游戏区域一开始的坐标
var positionX=200;
var positionY=100;

//蛇的移动时间间隔
var intervalTime=300;


//定义方块的构造函数（x轴的索引，y轴的索引，宽，高，dom）。每一个元素都是由它生成的
function Square(x,y,width,height,dom){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.viewContent=dom||document.createElement('div');
}


//创建相关的元素对象。这些对象都是通过Square生成的实例对象
var Ground=tool.single(Square);    //整个游戏场景，包含所有的元素。是个单例对象。
var Floor=tool.extends(Square);     //地板对象。里面是由很多个小方块所构成
var Wall=tool.extends(Square);      //围墙