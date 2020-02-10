(function ($, root) {
    var dur;
    var frameId;
    var startTime;
    var lastPer = 0;
    function renderAlltime(time) {
        dur = time;
        time = formatTime(time);
        $('.all-time').html(time);
    }
    function formatTime(time) {
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var s = time - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }

    function start(p) {
        lastPer = p == undefined ? lastPer : p;
        // console.log(lastPer, p);
        startTime = new Date().getTime();
        cancelAnimationFrame(frameId);
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (dur * 1000);
            if (per <= 1) {
                update(per);
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    function update(per) {
        // console.log(per);
        var time = per * dur;
        time = formatTime(time);
        $('.cur-time').html(time);
        var perX = (per - 1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        })
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (dur * 1000);
        // console.log(lastPer);
    }

    root.pro = {
        renderAlltime: renderAlltime,
        start: start,
        stop: stop,
        update:update
    }

})(window.Zepto, window.player || (window.player = {}));