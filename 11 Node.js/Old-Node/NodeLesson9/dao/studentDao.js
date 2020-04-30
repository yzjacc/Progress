var dbutil = require("./dbutil");

function queryAllStudent(success) {

    var querySql = "select * from student;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function (error, result) {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            console.log(error);
        }

    });
    connection.end();
}

function queryStudentByClassAndAge(classNum, age) {

    var querySql = "select * from student where class = ? and age = ?;";
    var queryParams = [classNum, age];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, queryParams, function (error, result) {
        if (error == null) {
            console.log(result);
        } else {
            console.log(error);
        }

    });
    connection.end();

}

function queryStudentByStuNum(stuNum, success) {

    var querySql = "select * from student where stu_num = ?;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, stuNum, function (error, result) {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}


module.exports = {  "queryAllStudent": queryAllStudent,
                    "queryStudentByClassAndAge": queryStudentByClassAndAge,
                    "queryStudentByStuNum": queryStudentByStuNum};




