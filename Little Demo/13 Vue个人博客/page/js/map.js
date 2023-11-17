var blogs = new Vue({
    el: "#blogs",
    data: {
        blogList:[]
    },
    computed: {
        jumpTo: function () {
            return function (id) {
                location.href = "/blogDetail.html?id=" + id;
            }
        }
    },
    created: function f() {
        axios({
            url: "/blog/getAllBlogMsg",
            method: "get"
        }).then(function (resp) {
            blogs.blogList = resp.data;
        });
    }
});