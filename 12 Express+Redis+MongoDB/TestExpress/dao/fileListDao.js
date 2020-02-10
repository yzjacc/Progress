var dbutil = require("./dbutil");

function insertFileList(fileName, fileSize, filePath, stuNum, success) {
    var insertSql = "insert into file_list (file_name, file_size, file_path, stu_num) values(?,?,?,?);";
    var params = [fileName, fileSize, filePath, stuNum];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }

    });
    connection.end();
}

module.exports = {"insertFileList": insertFileList};




