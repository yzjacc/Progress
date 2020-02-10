var snake=new Snake();
snake.head=null;    //蛇头
snake.tail=null;    //蛇尾

//蛇走的方向
var directionNum={
	left:{
		x:-1,
		y:0
	},
	right:{
		x:1,
		y:0
	},
	top:{
		x:0,
		y:-1
	},
	bottom:{
		x:0,
		y:1
	}
}

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

	//形成链表关系
	snakeHead.next=snakeBody1;
	snakeHead.last=null;

	snakeBody1.next=snakeBody2;
	snakeBody1.last=snakeHead;
	
	snakeBody2.next=null;
	snakeBody2.last=snakeBody1;

	//给蛇添加一个要走的方向，默认为right
	this.direction=directionNum.right;
}
// snake.init();

//获取蛇头走到（碰撞）的下一下格子
snake.getCollideSquare=function(){
	var square=ground.squareTable[snake.head.y+this.direction.y][snake.head.x+this.direction.x];
	//console.log(square)
	this.collidMethod[square.collide()](square);
}

//处理碰撞后要做的事情
snake.collidMethod={
	move:function(square,boolean){
	   //创建一个新身体
	   var newBody=SquareFactory.create('SnakeBody',snake.head.x,snake.head.y,'green');
		
	   //更新链表的关系（注意：这里没有body1,body2,只有head，所以关系只能从head身上找）
	   newBody.next=snake.head.next;
	   newBody.last=null;
	   newBody.next.last=newBody;


	   ground.remove(snake.head.x,snake.head.y);
	   ground.append(newBody);

	   //创建一个新的蛇头
	   var newHead=SquareFactory.create('SnakeHead',square.x,square.y,'deeppink'); 

	   newHead.next=newBody;
	   newHead.last=null;
	   newBody.last=newHead;

	   ground.remove(square.x,square.y);
	   ground.append(newHead);

	   snake.head=newHead;

		//这个条件成立说明现在是走，走的话就要把最后一个删除
	   if(!boolean){
			var newFloor=SquareFactory.create('Floor',snake.tail.x,snake.tail.y,'grey'); 
			ground.remove(snake.tail.x,snake.tail.y);
			ground.append(newFloor);
			snake.tail=snake.tail.last;
	   }
	},
	eat:function(square){
		this.move(square,true);
		createFood();
		game.score++;
	},
	die:function(){
		game.over();
	}
}

// snake.getCollideSquare();