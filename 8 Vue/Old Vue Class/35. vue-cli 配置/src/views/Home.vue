<template>
  <div class="home">
    kjhkhgkgg
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
// axios

export default {
  name: 'home',
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter');
    next();
  },
  mounted () {
    axios.get('/api/chat/sendMsg', {
      params: {
        msg: '你好啊',
        appkey: 'shan_1546508603194'
      }
    })
    .then(res => {
      console.log(res)
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang="less" scoped>
div {
  color: @color;
}
</style>