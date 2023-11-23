const { WebSocketServer } = require('ws');

function createServer(port) {
  return new Promise(function (resolve) {
    const wss = new WebSocketServer(
      {
        port,
      },
      () => {
        resolve(wss);
      }
    );
  });
}

let count = 0;

async function init(port) {
  const wss = await createServer(port);
  console.log(`支持原生 WebSocket 的服务器已启动，端口号：${port}`);
  wss.on('connection', (socket) => {
    // console.log(`有一个小伙伴已经和我完成了握手，可以随意的发消息了！`);
    socket.on('message', (message) => {
      // console.log(`收到小伙伴的消息：${message}`);
      socket.send('你说的真好！很棒棒哦！');
    });
  });
  const timer = setInterval(() => {
    count++;
    wss.clients.forEach((ws) => {
      ws.send(`来自服务器的消息：${count}`);
    });
  }, 3000);
  wss.on('close', () => {
    clearInterval(timer);
  });
}

init(9527);
