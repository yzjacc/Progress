
// 首先获取到一个 WebSocketServer 类
var WebSocketServer = require("ws").Server;

// 创建 WebSocket 服务器
var wss = new WebSocketServer({
    port : 3000
})

// 该数组用于保存所有的客户端连接实例
var clients = [];

// 当客户端连接上 WebSocket 服务器的时候
// 就会触发 connection 事件，该客户端的实例就会传入此回调函数
wss.on("connection", function(client){
    // 将当前客户端连接实例保存到数组里面
    clients.push(client);
    console.log(`当前有${clients.length}个客户端在线...`);

    // 给传入进来的客户端连接实例绑定一个 message 事件
    client.on('message', function(msg){
        console.log("收到的消息为：" + msg);
        // 接下来需要将接收到的消息推送给其他所有的客户端
        for(var c of clients){
            if(c !== client){
                c.send(msg.toString());
            }
        }
    })

    client.on('close',function(){
        var index = clients.indexOf(this);
        clients.splice(index, 1);
        console.log(`当前有${clients.length}个客户端在线...`);
    })
})

console.log("Web Socket 服务器已经启动....");