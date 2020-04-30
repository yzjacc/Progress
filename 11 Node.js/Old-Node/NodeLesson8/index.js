var http = require("http");
var url = require("url"); //处理url字符串
var fs = require("fs");
var globalConfig = require("./config");
var loader = require("./loader");

http.createServer(function (request, response) {

    var pathName = url.parse(request.url).pathname;//得到路径名
    var params = url.parse(request.url, true).query;//得到参数 传参数true 会自动解析为一个对象

    var isStatic = isStaticsRequest(pathName);
    if (isStatic) {//请求的静态文件
        try {
            var data = fs.readFileSync(globalConfig["page_path"] + pathName);
            response.writeHead(200);
            response.write(data);
            response.end();    
        } catch (e) {
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound</h1></body></html>");
            response.end();
        }
    } else {//请求的动态的数据
        if (loader.get(pathName) != null) {
            try {
                loader.get(pathName)(request, response);
            } catch (e) {
                console.log(e);
                response.writeHead(500);
                response.write("<html><body><h1>500 BadServer</h1></body></html>");
                response.end();
            }

        } else {
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound</h1></body></html>");
            response.end();
        }
    }

}).listen(globalConfig["port"]);

function isStaticsRequest(pathName) {
    for (var i = 0 ; i < globalConfig.static_file_type.length ; i ++) {
        var temp = globalConfig.static_file_type[i];
        if(pathName.indexOf(temp) == pathName.length - temp.length){
            return true;
        } 
    }
    return false;
}