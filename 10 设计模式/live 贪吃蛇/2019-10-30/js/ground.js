
var ground=new Ground(positionX,positionY,td*squareWidth,tr*squareWidth);
console.log(ground);
ground.init=function(){
    this.viewContent.style.position='absolute';
    this.viewContent.style.left=this.x+'px';
    this.viewContent.style.top=this.y+'px';
    this.viewContent.style.width=this.width+'px';
    this.viewContent.style.height=this.height+'px';
    this.viewContent.style.backgroundColor='grey';

    document.body.appendChild(this.viewContent);
}

ground.init();