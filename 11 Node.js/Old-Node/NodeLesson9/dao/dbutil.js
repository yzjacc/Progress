var mysql = require("mysql");

function createConnection() {
    var connection  = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "123456",
        database: "test"
    });
    // var querySql = "select * from student"
    // connection.connect();
    //                                     // 结果和异常
    // connection.query(querySql, function(error,result){

    // })
    // connection.end();
    return connection;
}

module.exports.createConnection = createConnection;