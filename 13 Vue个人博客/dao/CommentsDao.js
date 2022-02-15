var dbUtil = require("./DBUtil");

function insertComments(blogId, commentsId, content, name, email, ctime, success) {
    var sql = "insert into comments (`blog_id`, `comments_id`, `content`, `name`, `email`, `ctime`) values (?, ?, ?, ?, ?, ?);";
    var params = [blogId, commentsId, content, name, email, ctime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

function queryCommentsByBlogId(blogId, success) {
    var sql = "select * from comments where blog_id = ?;";
    var params = [blogId];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

function queryCommentsByTime(size, success) {
    var sql = "select * from comments order by id desc limit ?;";
    var params = [size];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

module.exports.insertComments = insertComments;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsByTime = queryCommentsByTime;