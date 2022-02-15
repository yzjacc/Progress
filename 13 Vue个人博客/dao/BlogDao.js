var dbUtil = require("./DBUtil");
var timeUtil = require("../util/TimeUtil");

function insertBlog(title, author, content, views, ctime, tags, success) {
    var sql = "insert into blog (`title`, `author`, `content`, `views`, `ctime`, `tags`) values (?, ?, ?, ?, ?, ?);";
    var params = [title, author, content, views, ctime, tags];
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
function deleteBlog(id, success) {
    var sql = "delete from blog where id = ?;";
    var params = [id];
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
function addViews(id, success) {
    var sql = "update blog set views = views + 1 where id = ?;";
    var params = [id];
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
function queryAllBlog(success) {
    var sql = "select id, title, author, views, ctime, tags from blog;";
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}
function queryBlogCount(success) {
    var sql = "select count(1) as count from blog;";
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}
function queryBlogByPage(offset, limit, success) {
    var sql = "select * from blog order by id desc limit ?,?;";
    var params = [offset, limit];
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
function queryBlogByViews(success) {
    var sql = "select * from blog order by views desc limit 10;";
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}
function queryBlogById(id, success) {
    var sql = "select * from blog where id = ?;";
    var params = [id];
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
function queryBlogBySearch(search, success) {
    var sql = "select * from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%');";
    var params = [search, search];
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

function queryBlogBySearchCount(search, success) {
    var sql = "select count(1) from blog where title like \"%?%\" or content like \"%?%\";";
    var params = [search, search];
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

module.exports.insertBlog = insertBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.addViews = addViews;
module.exports.queryAllBlog = queryAllBlog;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogByViews = queryBlogByViews;
module.exports.queryBlogById = queryBlogById;
module.exports.queryBlogBySearch = queryBlogBySearch;
module.exports.queryBlogBySearchCount = queryBlogBySearchCount;

