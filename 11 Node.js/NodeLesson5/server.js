var net = require("net");

var server = net.createServer();
server.listen(12306, "127.0.0.1");

server.on("listening", function () {
    console.log("服务已启动");
});

server.on("connection", function (socket) {
    console.log("有新的连接");
    socket.on("data", function (data) {
        var request = data.toString().split("\r\n");
        var url = request[0].split(" ")[1];
        console.log(url);
        // socket.write("HTTP 200OK\r\nContent-type:text/html\r\nServer:DWS/1.1\r\n\r\n<html><body>hello browser</body></html>");
    });
});
