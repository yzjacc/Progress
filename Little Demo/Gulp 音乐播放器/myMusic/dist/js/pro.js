(function ($, root) {
    var dur;
    var frameId;
    var startTime,lastPer = 0;
    // 渲染总时间
    function renderAlltime(time){
        dur = time;
        time = formatTime(time);
        $('.all-time').html(time);
    };
    // 时间格式转换
    function formatTime(time){
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var s = time - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        return m + ':' + s;
    }
    // 进度条开始记录时间
    function start(p){
        lastPer = p === undefined ? lastPer : p;
        // 获得当前开始时间戳
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            // 获得此刻当前时间
            var curTime = new Date().getTime();
            // 计算经过时间是总时间得百分比  利用百分比控制左侧经过时间显示及进度条位置
            var per = lastPer + (curTime - startTime) / (dur * 1000);
            // console.log(curTime-startTime,dur,per)
            if(per <= 1){
                update(per);
            }else{
                cancelAnimationFrame(frameId);
                $('.next').trigger('click');
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    };

    // 更新进度条位置 和时间
    function update(per){
        // 更新时间
        var time = formatTime(per * dur);
        // console.log(time)
        $('.cur-time').html(time);
        // 更新进度条
        var perX = (per - 1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        })
    };

    function stop(){
        cancelAnimationFrame(frameId);
        // 记录一下停止时间
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime)/(dur * 1000);
    }

    root.pro = {
        renderAlltime:renderAlltime,
        start:start,
        stop:stop,
        update:update
    }
})(window.Zepto, window.player || (window.player = {}))