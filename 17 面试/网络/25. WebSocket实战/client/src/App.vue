<template>
  <div class="app">
    <ChatWindow
      v-if="!isLoading"
      :me="me"
      :history="history"
      :users="users"
      @chat="handleChat"
    />
  </div>
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
      history: [],
      me: '',
      users: [],
      isLoading: true,
      socket: null,
    };
  },
  created() {
    this.socket = io('ws://localhost:9528');
    this.socket.on('connect', () => {
      this.isLoading = false;
    });
    this.socket.on('$updateUser', (users) => {
      this.users = users;
    });
    this.socket.on('$name', (name) => {
      this.me = name;
    });
    this.socket.on('$history', (history) => {
      this.history = history;
    });
    this.socket.on('$message', (msg) => {
      this.history.push(msg);
    });
  },
  beforeDestroy() {
    this.socket.disconnect();
  },
  methods: {
    handleChat(msg) {
      this.history.push(msg);
      this.socket.emit('$message', msg.content);
    },
  },
};
</script>

<style>
.app {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
</style>
