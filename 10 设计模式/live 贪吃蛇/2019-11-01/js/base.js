/* 基础库，这里放一些工具，公用的方法（继承、扩展、单例） */

var tool={
    //继承
    inherit:function(target,origin){    //target:目标对象。origin:源对象
        var F=function(){};
        F.prototype=origin.prototype;
        target.prototype=new F();
        target.prototype.constructor=target;
    },

    //扩展
    extends:function(origin){
        var target=function(){
            origin.apply(this,arguments);
            return this;
        };

        this.inherit(target,origin)
        return target;
    },

    //单例
    single:function(origin){
        var singleResult=(function(){
            var instance;
            return function(){
                if(typeof instance == 'object'){
                   return  instance;
                }

                origin && origin.apply(this,arguments);
                instance=this;
            }
        })();
        origin && this.inherit(singleResult,origin);
        return singleResult;
    }
};

/* function Square(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
}
Square.prototype.collied=function(){
    console.log('collied');
} */

/* function Food(){

}
tool.inherit(Food,Square);
var f=new Food();
f.collied(); */

/* var Food=tool.extends(Square);
var f=new Food(10,10,100,100);
f.collied(); */


/* var SnakeHead=tool.extends(Square);
var s1=new SnakeHead(10,10,100,100);
var s2=new SnakeHead(20,20,200,200);
console.log(s1==s2); */