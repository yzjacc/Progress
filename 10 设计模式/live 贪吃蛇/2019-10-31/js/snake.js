var snake=new Snake();
snake.head=null;    //蛇头
snake.tail=null;    //蛇尾

snake.init=function(){
    var snakeHead=SquareFactory.create('SnakeHead',3,1,'deeppink');
    var snakeBody1=SquareFactory.create('SnakeBody',2,1,'green');
    var snakeBody2=SquareFactory.create('SnakeBody',1,1,'green');

    snake.head=snakeHead;    //蛇头
    snake.tail=snakeBody2;    //蛇尾

    ground.remove(snakeHead.x,snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x,snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x,snakeBody2.y);
    ground.append(snakeBody2);

}
snake.init();