var tagsCloud = new Vue({
    el: "#tags_cloud",
    data: {
        tags: [{tag: "asd", url: "http://www.baidu.com"}
        ,{tag: "qwe", url: "http://www.baidu.com"}
        ,{tag: "zxqweqwec", url: "http://www.baidu.com"}
            ,{tag: "123", url: "http://www.baidu.com"}
            ,{tag: "456789", url: "http://www.baidu.com"}
            ,{tag: "qwsdfsdfe", url: "http://www.baidu.com"}
            ,{tag: "asdasd", url: "http://www.baidu.com"}]
    },
    computed: {
        randColor: function () {
            return function () {
                var r = 50 + Math.floor(Math.random() * 200);
                var g = 50 + Math.floor(Math.random() * 200);
                var b = 50 + Math.floor(Math.random() * 200);
                return "rgb( " + r +", " + g + ", " + b +")";
            }
        },
        randSize: function () {
            return function () {
                return (15 + Math.floor(Math.random() * 30)) + "px";
            }
        }
    },
    created: function () {
        axios({
            url: "/getTagsCloud",
            method: "get"
        }).then(function (resp) {
            var result = [];
            for (var i = 0 ; i < resp.data.length ; i ++) {
                result.push({tag: resp.data[i].name, url: "http://www.baidu.com"})
            }
            tagsCloud.tags = result;
        });
    }
});

var hotBlog = new Vue({
    el: "#hot_blog",
    data: {
        blogList: [{name: "asd", url: "http://www.baidu.com"},{name: "qwe", url: "http://www.baidu.com"},{name: "zxc", url: "http://www.baidu.com"}]
    },
    created: function () {
        axios({
            url: "/getHotBlog",
            method: "get"
        }).then(function (resp) {
            var result = [];
            for (var i = 0 ; i < resp.data.length ; i ++) {
                result.push({name: resp.data[i].title, url: "http://www.baidu.com"})
            }
            hotBlog.blogList = result;
        });
    }
});

// window.onload = function () {
//     var footer = document.getElementsByTagName("footer")[0];
//     footer.style.top = (document.body.scrollHeight + 30) + "px";
// }