var data = ""; // 存储用户发送过来的信息
onconnect = function (e) {
    var port = e.ports[0];

    port.onmessage = function (e) {
        // 说明要将接收到数据返回给客户端
        if(e.data === "get"){
            port.postMessage(data);
            data = "";
        } else {
            data = e.data;
        }
    }

}