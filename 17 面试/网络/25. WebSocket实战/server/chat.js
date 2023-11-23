const { Server } = require('socket.io');

const history = []; // 聊天历史记录 {name:string, content:string, date: number}
let nextId = 1; // 下一个用户的id
const users = new Set(); // 用户数组

const io = new Server({
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // 分配用户名
  const username = `游客${nextId++}`;
  users.add(username);
  // 广播通知所有用户（含自己)
  io.emit('$updateUser', [...users]);
  // 发送聊天记录
  socket.emit('$history', history);
  // 告知用户名
  socket.emit('$name', username);

  // 监听聊天消息
  socket.on('$message', (content) => {
    const msg = {
      name: username,
      content,
      date: Date.now(),
    };
    history.push(msg);
    // 广播消息
    socket.broadcast.emit('$message', msg);
  });

  socket.on('disconnect', () => {
    // 清除用户
    users.delete(username);
    // 广播通知所有用户
    socket.broadcast.emit('$updateUser', [...users]);
  });
});

io.listen(9528);
console.log(`Socket.io 聊天室已启动，端口号：9528`);
