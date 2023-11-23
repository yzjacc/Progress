<template>
  <div class="container">
    <div class="users">
      <p>聊天室成员</p>
      <ul>
        <li v-for="u in users" :key="u">{{ u }}</li>
      </ul>
    </div>
    <div class="main">
      <div class="content-area" ref="info">
        <div
          class="item"
          :class="{ mine: me === h.name }"
          v-for="(h, i) in history"
          :key="i"
        >
          <div class="name">{{ h.name }}</div>
          <div class="content">{{ h.content }}</div>
          <div class="date">{{ formatDate(h.date) }}</div>
        </div>
      </div>
      <div class="form">
        <textarea v-model="value" @keydown.enter="handleEnter"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
moment.locale('zh-cn');

export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    history: {
      type: Array,
      default: () => [],
    },
    me: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  mounted() {
    this.$watch(
      'history',
      () => {
        const div = this.$refs.info;
        div.scroll(0, div.scrollHeight);
      },
      { immediate: true }
    );
  },
  methods: {
    formatDate(date) {
      date = moment(date);
      return date.fromNow().replace(/\s/g, '');
    },
    handleEnter() {
      const v = this.value.trim();
      if (v) {
        this.value = '';
        this.$emit('chat', { name: this.me, content: v, date: Date.now() });
      }
    },
  },
};
</script>

<style scoped>
.container {
  background: #fff;
  width: 665px;
  height: 522px;
  display: flex;
  border-radius: 5px;
  box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.users {
  width: 150px;
  border-right: 1px solid #ccc;
  line-height: 30px;
  overflow: auto;
  flex: 0 0 auto;
}
.users p {
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.users li {
  padding: 0 10px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  background: #f1f1f1;
}
.users li:nth-child(2n) {
  background: #fff;
}

.main {
  flex: 1 1 auto;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
}
.content-area {
  height: 400px;
  padding: 1em;
  overflow: auto;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  line-height: 1.5;
  flex: 0 0 auto;
  scroll-behavior: smooth;
}
.item {
  float: left;
  max-width: 70%;
  clear: both;
  margin-bottom: 1em;
}
.name {
  font-size: 12px;
  color: #666;
}
.date {
  color: #bbb;
  font-size: 12px;
  text-align: right;
}
.content {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
}
.mine.item {
  float: right;
}
.mine .content {
  background: #a9e97a;
}
.mine .name {
  text-align: right;
}
.mine .date {
  text-align: left;
}
.form {
  flex: 1 1 auto;
}
.form textarea {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
  padding: 20px;
}
</style>
