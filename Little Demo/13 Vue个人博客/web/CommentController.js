var app = require("../express");
var url = require("url");
var commentDao = require("../dao/CommentsDao");
var captcha = require("svg-captcha");
var timeUtil = require("../util/TimeUtil");

app.get("/blog/getComment", function (request, response) {
    var params = url.parse(request.url, true).query;
    if (!params.id) {
        response.writeHead(400);
        response.end("must be have id");
        return;
    }
    commentDao.queryCommentsByBlogId(parseInt(params.id), function (result) {
        var map = new Map();
        for (var i = 0 ; i < result.length ; i ++) {
            map.set(result[i].id, result[i].name);
            if (result[i].comments_id != 0) {
                result[i].name = result[i].name + " 回复 " + map.get(result[i].comments_id);
            }
        }
        response.writeHead(200);
        response.end(JSON.stringify(result));
        return;
    });
});

app.get("/blog/getRandomCode", function (request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.end(JSON.stringify(img));
});

app.get("/blog/sendComment", function (request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    commentDao.insertComments(parseInt(params.blogId), parseInt(params.commentId), params.content, params.name, params.email, timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.end();
    });
})