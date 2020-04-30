var studentDao = require("../dao/studentDao");

function queryAllStudent(success) {

    studentDao.queryAllStudent(success);

}

function queryStudentByStuNum(stuNum, success) {
    studentDao.queryStudentByStuNum(stuNum, success);
}

module.exports = {  "queryAllStudent": queryAllStudent,
                    "queryStudentByStuNum": queryStudentByStuNum};