<template>
  <ChatWindow :me="me" :history="history" :users="users" @chat="handleChat" />
</template>

<script>
import ChatWindow from './components/ChatWindow.vue';
import { io } from 'socket.io-client';
export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      me: '', // 我的用户名
      history: [], // 历史消息记录
      users: [], // 当前聊天室的用户
      socket: null,
    };
  },
  methods: {
    handleChat(msg) {
      this.history.push(msg);
      this.socket.emit('$message', msg.content);
    },
  },
  created() {
    this.socket = io('ws://localhost:9528'); // 连接，握手
    this.socket.on('$updateUser', (users) => {
      this.users = users;
    });
    this.socket.on('$name', (name) => {
      this.me = name;
    });
    this.socket.on('$history', (history) => {
      this.history = history;
    });
    this.socket.on('$message', (message) => {
      this.history.push(message);
    });
  },
  beforeDestroy() {
    this.socket.disconnect(); // 关闭连接
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}
body {
  background: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
