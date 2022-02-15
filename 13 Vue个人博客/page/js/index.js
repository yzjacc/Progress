var everyDay = new Vue({
    el: "#everyDay",
    data: {
        content: ""
    },
    created: function () {
        axios({
            url: "/blog/getEveryDay",
            method: "get"
        }).then((resp) => {
            everyDay.content = resp.data[0].content;
        });
    }
});

var blogList = new Vue({
    el: "#blogList",
    data: {
        list: []
    },
    computed: {
        jumpTo: function () {
            return function (id) {
                location.href = "/blogDetail.html?id=" + id;
            }
        }
    },
    created: function () {
        axios({
            url: "/blog/getBlogByPage?offset=0&limit=5",
            method: "get"
        }).then((resp) => {
            blogList.list = resp.data;
        });
    }
});

var pageTools = new Vue({
    el: "#pageTools",
    data: {
        total: 0,
        nowPage: 1,
        limit: 5,
        pageList: []
    },
    methods: {
        refresh: function () {
            var totalPage = Math.floor((pageTools.total + pageTools.limit - 1) / pageTools.limit);
            pageTools.pageList = [];
            pageTools.pageList.push({text: "首页", pageNum: 1});
            if (pageTools.nowPage - 2 > 0) {
                pageTools.pageList.push({text: pageTools.nowPage - 2, pageNum: pageTools.nowPage - 2});
            }
            if (pageTools.nowPage - 1 > 0) {
                pageTools.pageList.push({text: pageTools.nowPage - 1, pageNum: pageTools.nowPage - 1});
            }
            pageTools.pageList.push({text: pageTools.nowPage, pageNum: pageTools.nowPage});
            if (pageTools.nowPage + 1 <= totalPage) {
                pageTools.pageList.push({text: pageTools.nowPage + 1, pageNum: pageTools.nowPage + 1});
            }
            if (pageTools.nowPage + 2 <= totalPage) {
                pageTools.pageList.push({text: pageTools.nowPage + 2, pageNum: pageTools.nowPage + 2});
            }
            pageTools.pageList.push({text: "尾页", pageNum: totalPage});
        }
    },
    computed: {
        changePage: function () {
            return function (pageNum) {
                pageTools.nowPage = pageNum;
                this.refresh();
                axios({
                    url: "/blog/getBlogByPage?offset=" + (pageNum - 1) * pageTools.limit +"&limit=" + pageTools.limit,
                    method: "get"
                }).then((resp) => {
                    blogList.list = resp.data;
                });
            }
        }
    },
    created: function () {
        axios({
            url: "/blog/getTotalBlogCount",
            method: "get"
        }).then((resp) => {
            pageTools.total = resp.data[0].count;
            pageTools.refresh();
        });
    }
});

var search = new Vue({
    el: "#search",
    data: {
        search: ""
    },
    methods: {
        sendSearch: function () {
            axios({
                url: "/blog/search?search=" + this.search
            }).then(function (resp) {
                pageTools.total = resp.data.count;
                pageTools.nowPage = 1;
                pageTools.refresh();
                blogList.list = resp.data.list;
            });
        }
    },
    computed: {

    }
});