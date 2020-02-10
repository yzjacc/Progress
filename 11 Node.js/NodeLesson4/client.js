var net = require("net");

var socket = net.connect(12306, "127.0.0.1");
socket.setTimeout(2000);

socket.on("connect", function () {
   console.log("已连接到服务器");
});
socket.on("timeout", function() {
   console.log("超时啦");
   socket.end();
});
//
// socket.on("data", function(data) {
//     console.log(data.toString());
//     socket.end();
// });
//
// socket.on("close", function () {
//     console.log("连接已关闭");
// });

socket.write("hello server");