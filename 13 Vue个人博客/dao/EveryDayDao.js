var dbUtil = require("./DBUtil");

function insertEveryDay(content, ctime, success) {
    var sql = "insert into every_day (`content`, `ctime`) values (?, ?);";
    var params = [content, ctime];
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

function queryLastEveryDay(success) {
    var sql = "select * from every_day order by id desc limit 1;";
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

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryLastEveryDay = queryLastEveryDay;