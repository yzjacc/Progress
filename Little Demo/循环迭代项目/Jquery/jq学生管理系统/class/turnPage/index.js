
(function () {

    function TurnPage(options) {
        this.wrap = options.wrap;
        this.curPage = options.curPage || 1;
        this.allPage = options.allPage || 1;
        // 
        this.changePageCb = options.callback || function () {};
        this.init = function () {
            this.createDom();
            this.bindEvent();
        }
    }
    TurnPage.prototype.createDom = function () {
        $(this.wrap).empty();
        var oUl = $('<ul class="my-turn-page"></ul>')
        // 添加上一页

        if (this.curPage > 1) {
            $('<li class="prev">上一页</li>').appendTo(oUl);
        }
        // 添加没有样式的第一页
        if (this.curPage != 1) {
            $('<li class="num">1</li>').appendTo(oUl);
        }
        
        // 前面的省略号
        if(this.curPage > 4) {
            $('<span>...</span>').appendTo(oUl);
        }

        // 中间五页 即 当前页+ 当前页的前后各两页
        for (var i = this.curPage - 2; i <= this.curPage + 2; i++) {
            //  如果页码不合理 继续下一次循环
            if (i == this.curPage) {
                $('<li class="num active">' + i + '</li>').appendTo(oUl);
            } else if (i > 1 && i < this.allPage) {
                $('<li class="num">' + i + '</li>').appendTo(oUl);
            }
        }
        // 添加后面的省略号 
        if (this.curPage + 2 < this.allPage - 1) {
            $('<span>...</span>').appendTo(oUl);
        }
        // 添加没有样式的最后一页
        if (this.curPage != this.allPage) {
            $('<li class="num">' + this.allPage + '</li>').appendTo(oUl);
        }
        
        // 创建后面的省略号： 当前页+2 是否 < 总页数-1   
        // 创建没有样式的最后一页： 当前页不等于总页数
        if (this.curPage < this.allPage) {
            $('<li class="next">下一页</li>').appendTo(oUl);
        }

        $(this.wrap).append(oUl);

    }
    TurnPage.prototype.bindEvent = function () {
        var self = this;
        $('.my-turn-page', this.wrap).on('click', 'li', function () {
            // 判断点击上一页
            if ($(this).hasClass('prev')) {
                if(self.curPage > 1) {
                    self.curPage --;
                    self.changePage();
                }
            // 判断点击下一页按钮
            } else if ($(this).hasClass('next')) {
                if(self.curPage < self.allPage) {
                    self.curPage ++;
                    self.changePage();
                }
            // 点击的是页码
            } else if ($(this).hasClass('num')) {
                var page = parseInt($(this).text());
                if (page != self.curPage) {
                    self.curPage = page;
                    self.changePage();
                }
            }
        })
    }
    TurnPage.prototype.changePage = function () {
        this.createDom();
        this.changePageCb(this.curPage);
    }

    $.fn.extend({
        turnpage: function (options) {
            options.wrap = this;
            var obj = new TurnPage(options);
            obj.init();
        }
    })


} ())