var studentService = require("../service/studentService");

var path = new Map();

function getData(request, response) {


    studentService.queryAllStudent(function (result) {
        var resArr = [];
        for (var i = 0 ; i < result.length ; i ++) {
            resArr.push(result[i].name);
        }
        response.write(resArr.toString());
        response.end();
    });

}
path.set("/getData", getData);


function login(request, response) {

    request.on("data", function(data){
        var stuNum = data.toString().split("&")[0].split("=")[1];
        var password = data.toString().split("&")[1].split("=")[1];
        studentService.queryStudentByStuNum(stuNum, function (result) {
            var res = "";
            if (result == null || result.length == 0) {
                res = "Fail";
                response.writeHead(302, {"location": "/error.html"});//重定向
                response.end();
            } else {
                if (result[0].pwd == password) {
                    res = "OK";
                    response.writeHead(302, {"location": "/main.html", "Set-Cookie": "id=" + result[0].id});
                    response.end();
                } else {
                    res = "Fail";
                    response.writeHead(302, {"location": "/error.html"});
                    response.end();
                }
            }

        });
    });

}
path.set("/login", login);


module.exports.path = path;

