// 消息就会到达这里
self.addEventListener("message", async event=>{
    // 首先获取到所有注册了 service worker 的客户端
    const clients = await self.clients.matchAll();
    clients.forEach(function(client){
        client.postMessage(event.data.value);
    })
})