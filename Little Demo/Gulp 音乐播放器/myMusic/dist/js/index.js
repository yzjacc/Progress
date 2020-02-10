var root = window.player;
var dataList = [];
var len = 0;
var audio = root.audioManager;
var contolIndex = null;
var timer = null;
// 获取数据
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            // root.render(data[0]);
            dataList = data;
            len = data.length;
            contolIndex = new root.controlIndex(len);
            // audio.getAudio(data[0].audio);
            bindEvent();
            bindTouch();
            $('body').trigger('play:change', 0);

        },
        error: function () {
            console.log('error');
        }
    })
}
// 绑定点击事件
function bindEvent() {
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        if (audio.status == 'play') {
            audio.play();
            rotated(0);
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            transform: 'rotateZ(' + 0 + 'deg)',
            transition: 'none'
        })
        // 进行渲染时间
        root.pro.renderAlltime(dataList[index].duration);
    });
    $('.prev').on('click', function (e) {
        var i = contolIndex.prev();
        $('body').trigger('play:change', i);
        // 切歌时清零
        // root.pro.start(0);
        root.pro.start(0);
        if (audio.status == 'pause') {
            audio.pause();
            // root.pro.stop();
            root.pro.stop();
        }
    });
    $('.like').on('click', function (e) {   
        $('.like').toggleClass('liking');   
    });
    $('.next').on('click', function (e) {
        var i = contolIndex.next();
        $('body').trigger('play:change', i);
        // 切歌时清零
        // root.pro.start(0); 
        root.pro.start(0);
        if (audio.status == 'pause') {
            audio.pause();
            // root.pro.stop();
            root.pro.stop();
        }
    });
    $('.play').on('click', function (e) {
        if (audio.status == 'pause') {
            audio.play();
            // 进度条开始计时
            root.pro.start();
            // root.pro.start();
            var deg = $('.img-box').attr('data-deg') || 0;
            rotated(deg);
        } else {
            audio.pause();
            // 进度条停止更新
            // root.pro.stop();
            clearInterval(timer);
            root.pro.stop();
        }
        $('.play').toggleClass('playing');   
    })
}
function rotated(deg) {
    // console.log(deg);
    clearInterval(timer);
    deg = parseInt(deg);
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            transform: 'rotateZ(' + deg + 'deg)',
            transition: 'transform 0.2s linear'
        })
    }, 200);
}
getData('../mock/data.json');


// 信息 + 图片渲染到页面上
// ，点击按钮
// 音频的播放与暂停  切歌
//  图片旋转
// 列表切歌 --> 作业
// 进度条运动与拖拽

// 拖拽事件  拖动小圆点 带着进度条运动
function bindTouch() {
    var $spot = $('.spot');
    var offset = $('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    $spot.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per < 1) {
            root.pro.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per < 1) {
            var cutTime = per * dataList[contolIndex.index].duration;
            $('.play').addClass('playing');
            audio.playTo(cutTime);
            audio.status = 'play';
            audio.play();
            root.pro.start(per);
        }
    })
}