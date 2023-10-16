// 获取 DOM 元素
var btn = document.querySelector('#header button');
var ul = document.querySelector('#header ul');

// 初始化变量
var display = true;

// 点击汉堡按钮对应的事件
// 出现菜单
btn.onclick = function () {
    ul.style.overflow = display ? 'visible' : 'hidden';
    display = !display;
}

// 轮播图
var swiper = document.querySelector('#pic ul');
var i = 0;
setInterval(function () {
    var length = i * -100;
    swiper.style.transform = `translateX(${length}vw)`;
    i++;
    if (i > 2) {
        i = 0;
    }
}, 2000)