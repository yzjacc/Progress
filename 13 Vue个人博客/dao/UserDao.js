var dbUtil = require("./DBUtil");

function insertUser(name, password, email, ctime, success) {
    var sql = "insert into user (`name`, `password`, `email`, `ctime`) values (?, ?, ?, ?)";
    var params = [name, password, email, ctime];
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

function queryUserById(id, success) {
    var sql = "select * from user where id = ?;";
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

function queryUserByName(name, success) {
    var sql = "select * from user where name = ?;";
    var params = [name];
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

module.exports.insertUser = insertUser;
module.exports.queryUserById = queryUserById;
module.exports.queryUserByName = queryUserByName;