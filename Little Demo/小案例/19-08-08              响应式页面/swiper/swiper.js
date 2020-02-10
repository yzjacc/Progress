(function ($) {
    function Swiper(options) {
        var options = options || {};
        var opts = $.extend({}, options);
        this.wrap = opts.father;
        this.img = opts.image;
        this.href = opts.href;
        this.init();
    };
    Swiper.prototype.init = function () {
        this.nowIndex = 0;
        this.len = this.img.length;
        this.timer = undefined;
        this.flag = true;
        this.itemWidth = parseInt(this.wrap.css('width'));
        this.itemHeight = parseInt(this.wrap.css('height'));
        this.createDom();
        this.bindEvent();
        this.sliderAuto();

    };
    Swiper.prototype.createDom = function () {
        var self = this;
        var len = this.len;
        var str = '';
        var href = this.href;
        var order = $('<div class="order"></div>');
        var imgBox = $('<ul class="img-box"></ul>');
        var itemWidth = self.itemWidth;
        var itemHeight = self.itemHeight;
        var list = $('<ul></ul>');
        var liStr = '';
        for (var i = 0; i < this.len; i++) {
            str += '<li><a href="javascript:;"><img src="' + this.img[i] + '" alt=""></a></li>';
            liStr += '<li></li>';
        }
        str += '<li><a href="javascript:;"><img src="' + this.img[0] + '" alt=""></a></li>';
        $(liStr).appendTo(list);
        this.wrap.append(imgBox.html(str))
            .append(order.append(list));
        $('.order li').eq(0).addClass('active');
        for (var i = 0; i < len; i++) {
            $('#swiper .img-box li').eq(i).find('a').attr('href', href[i]);
        }
        $('#swiper .img-box').css({ width: itemWidth * (len + 1) + 5 + 'px', height: itemHeight + 'px' });
        $('#swiper .img-box li').css({ width: itemWidth + 'px', height: itemHeight + 'px' });
        $('#swiper .img-box li img').css({ width: itemWidth + 'px', height: itemHeight + 'px' });
    };

    Swiper.prototype.bindEvent = function () {
        var self = this;
        var len = this.len;

        
        $(window).on('resize', function () {
            self.itemWidth = parseInt(self.wrap.css('width'));
            self.itemHeight = parseInt(self.wrap.css('height'));
            var itemWidth = self.itemWidth;
            var itemHeight = self.itemHeight
            $('#swiper .img-box').css({ 
                width: itemWidth * (len + 1) + 'px', 
                height: itemHeight + 'px', 
                left: - self.nowIndex * itemWidth + 'px'});
            $('#swiper .img-box li').css({ width: itemWidth + 'px', height: itemHeight + 'px' });
            $('#swiper .img-box li img').css({ width: itemWidth + 'px', height: itemHeight + 'px' });
            clearTimeout(self.timer);
        });


        $('.order li').add('.prevBtn').add('.nextBtn').on('click', function () {
            if ($(this).attr('class') == 'prevBtn') {
                self.move('prev');
            } else if ($(this).attr('class') == 'nextBtn') {
                self.move('next');
            } else {
                var index = $(this).index();
                self.move(index);
            }
            self.changeStyle();
        })
        self.wrap
            .on('mouseenter', function () {
                // $('.btn').show();
                clearTimeout(self.timer);
            })
            .on('mouseleave', function () {
                // $('.btn').hide();
                self.sliderAuto();
            })
    };

    Swiper.prototype.sliderAuto = function () {
        clearTimeout(this.timer);
        var self = this;
        this.timer = setTimeout(function () {
            self.move('next');
            self.changeStyle();
        }, 2000);
    };
    Swiper.prototype.move = function (direction) {
        var self = this;
        var nowIndex = self.nowIndex;
        var itemWidth = this.itemWidth;
        var len = this.len;
        if (this.flag) {
            this.flag = false;
            // var a = 1;
            if (direction == 'prev' || direction == 'next') {
                if (direction == 'prev') {
                    if (self.nowIndex == 0) {
                        $('.img-box').css({ left: -(len * itemWidth) });
                        self.nowIndex = len - 1;
                    } else {
                        self.nowIndex = self.nowIndex - 1;
                    }
                } else {
                    if (self.nowIndex == len - 1) {
                        // a = 0;
                        $('.img-box').animate({ left: -(itemWidth * len) }, function () {
                            $(this).css({ left: 0 });
                            self.sliderAuto();
                            self.flag = true;
                        })
                        self.nowIndex = 0;
                    } else {
                        self.nowIndex = self.nowIndex + 1;
                    }
                }
            } else {
                self.nowIndex = direction;
            }
            // a = 1;

            // if (a) {
            this.slider();
            // }
        }

    }
    Swiper.prototype.slider = function () {
        var self = this;
        $('.img-box').animate({ left: -(self.itemWidth * self.nowIndex) }, function () {
            self.sliderAuto();
            self.flag = true;
        });
    }
    Swiper.prototype.changeStyle = function () {
        $('.active').removeClass('active');
        $('.order li').eq(this.nowIndex).addClass('active');
    }

    $.fn.extend({
        sliderImg: function (options) {
            options.father = this || $('body');
            new Swiper(options);
        }
    });
})(jQuery)