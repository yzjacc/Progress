(function () {
    var obj = {
        init:function(){
            location.hash = 'student-echarts';
            this.bindEvent();
        },
        bindEvent:function(){
            $('.list-item').on('click',function(){
                $('.active').removeClass('active');
                console.log("dw")
                $(this).addClass('active');
            })
            var list = $('header .drop-list');
            $('header .btn').on('click', function () {
                var show = list.hasClass('show');
                list.slideDown();
                list.toggleClass('show');
                if (show) {
                    list.slideUp();
                }
            });
         
            $(window).resize(function () {
                if ($(window).innerWidth() >= 768) {
                    list.css('display', 'none');
                    list.removeClass('show');
                }
            });
            $('.list-item').on('click', function () {
                // 当前li样式展示
                $('.list-item.active').removeClass('active');
                location.hash = $(this).attr('data-id');
                $('.show-list').removeClass('show-list');
                $(location.hash).addClass('show-list');
                console.log(location.hash)
                $(this).addClass('active');
                $('.drop-list').slideUp();
                return false;
            });

            // 点击除了弹框区域消失
            $('.modal').on('click', function () {
                $('.modal').hide();
            });
            $('.modal-content').on('click', function (e) {
                e.stopPropagation();
            });
            $('.del-modal').on('click', function () {
                $('.del-modal').hide();
            });
            $('.del-modal .con').on('click', function (e) {
                e.stopPropagation();
            });

            $('.reset-btn').on('click', function () {
                $('.del-modal').hide();
            });

            $('.drop-list').on('mouseleave', function () {
                $(this).hide();
                list.removeClass('show');
            })
        }

    }
    obj.init();
})();