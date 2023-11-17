var blogComment = new Vue({
    el: "#blogComment",
    data: {
        commentList: [],
        randomCode: "",
        randomSvg: null,
        name: "",
        email: "",
        comment: "",
        inputRandomCode: "",
        commentId: 0
    },
    methods: {
        changeCode: function () {
            axios({
                url: "/blog/getRandomCode",
                method: "get"
            }).then(function (resp) {
                blogComment.randomCode = resp.data.text;
                blogComment.randomSvg = resp.data.data;
            });
        },
        sendComment: function () {
            if (this.name == "" || this.email == "" || this.comment == "" || this.inputRandomCode == "") {
                alert("内容不能为空");
                return;
            }
            if (this.inputRandomCode.toLowerCase() != this.randomCode.toLowerCase()) {
                alert("二维码输入不正确");
                return;
            }
            //blogId, commentId, content, name, email
            var blogId = -2;
            axios({
                url: "/blog/sendComment?blogId=" + blogId + "&commentId=" + this.commentId + "&content=" + this.comment + "&name=" + this.name + "&email=" + this.email,
                method: "get"
            }).then(function (resp) {
                alert("留言成功");
                blogComment.name = "";
                blogComment.email = "";
                blogComment.comment = "";
                blogComment.inputRandomCode = "";
                blogComment.commentId = 0;
            });
        }
    },
    computed: {
        huifu: function () {
            return function (commentId) {
                blogComment.commentId = commentId;
            }
        }
    },
    created: function () {

        axios({
            url: "/blog/getComment?id=-2",
            method: "get"
        }).then(function (resp) {
            console.log(resp.data);
            blogComment.commentList = resp.data;
            location.href = "#addComment"
        });
        axios({
            url: "/blog/getRandomCode",
            method: "get"
        }).then(function (resp) {
            blogComment.randomCode = resp.data.text;
            blogComment.randomSvg = resp.data.data;
        });
    }
});