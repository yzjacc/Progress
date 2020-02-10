(function ($, root) {
    // 音频播放功能
    function AudioManager(src) {
        // 创建audio对象
        this.audio = new Audio();
        // 音频默认播放状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function () {
            // console.log(this.audio)
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (time) {
            this.audio.currentTime = time;
            // this.audio.play();
        }
    }
    root.audioManager = new AudioManager();
})(window.Zepto, window.player || (window.player = {}))