var net  = require("net");//网络层和运输层   TCP/IP协议
var fs = require("fs");
var globalConf = require("./conf");

var server = net.createServer();
server.listen(globalConf.port, "127.0.0.1");

server.on("listening", function () {
    console.log("服务已启动");
});

server.on("connection", function(socket) {
    socket.on("data", function (data) {

        //console.log(data.toString());

        var url = data.toString().split("\r\n")[0].split(" ")[1];
        console.log(url)
        try {
            var dataFile = fs.readFileSync(globalConf["basePath"] + url);
            socket.write("HTTP/1.1 200OK\r\n\r\n");
            socket.write(dataFile);
        } catch (e) {
            socket.write("HTTP/1.1 404NotFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>");
        }
        socket.end();
    });
});