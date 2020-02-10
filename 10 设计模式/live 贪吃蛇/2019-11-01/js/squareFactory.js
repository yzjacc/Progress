//1、创建管理者
function SquareFactory(){

}

//2、包装创建方块的方法
SquareFactory.prototype.init=function(square,color,action){
    square.viewContent.style.position='absolute';
    square.viewContent.style.left=square.x*squareWidth+'px';
    square.viewContent.style.top=square.y*squareWidth+'px';

    square.viewContent.style.width=square.width+'px';
    square.viewContent.style.height=square.height+'px';
    square.viewContent.style.backgroundColor=color;

    //每个小方块身上都有一个方法，这个方法用来返回这个小方块的标签
    square.collide=function(){
        return action;
    }
}

//创建地板的方法
SquareFactory.prototype.Floor=function(x,y,color){
    var floor=new Floor(x,y,squareWidth,squareWidth);
    this.init(floor,color,squareTag.move);
    return floor;
}

//创建围墙的方法
SquareFactory.prototype.Wall=function(x,y,color){
    var wall=new Wall(x,y,squareWidth,squareWidth);
    this.init(wall,color,squareTag.die);
    return wall;
}
//创建蛇头的方法
SquareFactory.prototype.SnakeHead=function(x,y,color){
    var snakeHead=new SnakeHead(x,y,squareWidth,squareWidth);
    this.init(snakeHead,color,squareTag.die);
    snakeHead.upDate(x,y);
    return snakeHead;
}
//创建蛇身的方法
SquareFactory.prototype.SnakeBody=function(x,y,color){
    var snakeBody=new SnakeBody(x,y,squareWidth,squareWidth);
    this.init(snakeBody,color,squareTag.die);
    return snakeBody;
}
//创建食物的方法
SquareFactory.prototype.Food=function(x,y,color){
    var food=new Food(x,y,squareWidth,squareWidth);
    this.init(food,color,squareTag.eat);
    food.upDate(x,y);
    return food;
}



//3、提供对外接口
SquareFactory.create=function(type,x,y,color){
    if(typeof SquareFactory.prototype[type]=='undefined'){
       throw 'no this type' 
    }

    //子工厂继承父工厂
    SquareFactory.prototype[type].prototype=new SquareFactory();

    return new SquareFactory.prototype[type](x,y,color);
}