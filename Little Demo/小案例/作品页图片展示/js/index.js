//作品功能
var workLis=document.querySelectorAll("#works li");
var shadow=document.getElementById('shadow');

var shadowBox=document.getElementById("shadowBox");
var showPic=document.getElementById("showPic");

var prev=document.querySelector("#showPic .prev");
var next=document.querySelector("#showPic .next");

var imgParent=document.querySelector(".img");
var workImgs=showPic.getElementsByTagName("img");

var canClick=true;
var curNum=0;

var totalNum=workLis.length;

//图片预加载功能函数
function loadImg(imgArr,fn){
	var loadImgs=[],loadImgNum=0;
	for(var i=0;i<imgArr.length;i++){
		loadImgs[i]=new Image();
		loadImgs[i].onload=function(){
			loadImgNum++;
			if(loadImgNum==imgArr.length){
				fn(loadImgs);
			}
		}
		loadImgs[i].src=imgArr[i];
	}
}


//先把所有图片都存到一个数组里
var imgArr=[];
for(var i=0;i<totalNum;i++){
	imgArr.push('work_images/work_'+i+'_big.jpg');
}

loadImg(imgArr,function(images){
	for(var i=0;i<workLis.length;i++){
		workLis[i].index=i;
		workLis[i].onclick=function(ev){
			shadowBox.style.height=document.body.offsetHeight+'px';
			shadowBox.style.display='block';
			showPic.style.display='block';
			
			
			setTimeout(function(){
				shadowBox.style.opacity=1;
				showPic.style.opacity=1;
				showPic.style.transform='scale(1)';
			},50);
			
			
			curNum=this.index;
			
			console.log(curNum);
			
			workImgs[1].src=images[curNum].src;		//弹出层出来后，前面那张图应该显示为点击的那张图
			
			
			nextClick(images);
			prevClick(images);
			
			ev.cancelBubble=true;
		};
	}
});


//鼠标点击其它地方隐藏
document.addEventListener('click',function(){
	shadowBox.style.display='none';
	showPic.style.display='none';
	showPic.style.opacity=0;
	showPic.style.transform='scale(0)';
	
	workImgs[0].style.transform='translateX(0) rotateY(0)';
	workImgs[1].style.transform='rotateY(0)';
});

//下一张点击
function nextClick(images){
	var nextNum=0;
	
	next.onclick=function(ev){
		if(canClick){
			var endNum1=0;		//transitionend会触发多次，所以用两个变量来记录发生的次数
			var endNum2=0;
			
			nextNum=curNum+1;
			if(nextNum==totalNum){
				nextNum=0;
			}
			
			workImgs[0].src=images[nextNum].src;						//改后面那张图的地址
			workImgs[0].className=workImgs[1].className='moveToRight';	//改两张图的class
			
			workImgs[1].style.transform='translateX(600px) rotateY(-10deg)';		//上面的图往右走
			workImgs[1].addEventListener('transitionend',toRightEnd);				//到最右边了
			function toRightEnd(){
				endNum1++;
				workImgs[0].style.transform='rotateY(-10deg)';				//下面图片张开
				workImgs[1].style.transform='translateX(0) rotateY(0)';		//上面图片往左走
				
				//上面图片回到原来位置了，下面图片还没有合上
				if(endNum1==2){
					workImgs[1].style.zIndex=1;			//上面的图片跑后面
					workImgs[0].style.zIndex=2;			//下面的图片跑前面
					workImgs[0].style.transform='rotateY(0)';		//下面图片合上
				}
			}
			
			
			workImgs[0].addEventListener('transitionend',closeEnd);			//书合上了
			function closeEnd(){
				endNum2++;
				if(endNum2==2){	//所有运动都走完了
					curNum++;
					if(curNum==totalNum){
						curNum=0;
					}
					
					workImgs[0].style.zIndex=1;
					workImgs[1].style.zIndex=2;
					workImgs[1].src=images[nextNum].src;
					
					
					canClick=true;
				}
			}
		}
		
		canClick=false;
		ev.cancelBubble=true;
	};
}


//上一张点击
function prevClick(images){
	var lastNum=0;
	
	prev.onclick=function(ev){
		if(canClick){
			var endNum1=0;		//transitionend会触发多次，所以用两个变量来记录发生的次数
			var endNum2=0;
			
			prevNum=curNum-1;
			if(prevNum==-1){
				prevNum=totalNum-1;
			}
			
			workImgs[0].src=images[prevNum].src;						//改后面那张图的地址
			workImgs[0].className=workImgs[1].className='moveToLeft';	//改两张图的class
			
			workImgs[1].style.transform='translateX(-600px) rotateY(10deg)';		//上面的图往右走
			workImgs[1].addEventListener('transitionend',toRightEnd);				//到最右边了
			function toRightEnd(){
				endNum1++;
				workImgs[0].style.transform='rotateY(10deg)';				//下面图片张开
				workImgs[1].style.transform='translateX(0) rotateY(0)';		//上面图片往左走
				
				//上面图片回到原来位置了，下面图片还没有合上
				if(endNum1==2){
					workImgs[1].style.zIndex=1;			//上面的图片跑后面
					workImgs[0].style.zIndex=2;			//下面的图片跑前面
					workImgs[0].style.transform='rotateY(0)';		//下面图片合上
				}
			}
			
			
			workImgs[0].addEventListener('transitionend',closeEnd);			//书合上了
			function closeEnd(){
				endNum2++;
				if(endNum2==2){	//所有运动都走完了
					curNum--;
					if(curNum==-1){
						curNum=totalNum-1;
					}
					
					workImgs[0].style.zIndex=1;
					workImgs[1].style.zIndex=2;
					workImgs[1].src=images[prevNum].src;
					
					canClick=true;
				}
			}
		}
		
		canClick=false;
		ev.cancelBubble=true;
	};
}
	
	
	