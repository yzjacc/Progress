<template>
  <div id="app">
    <button @click="handleJSError">js错误</button>
    <button @click="handlePromiseError">promise异步错误</button>
    <button @click="handleResourceError">资源加载错误</button>
    <br>
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
export default {
  data() { 
    return {
      imgSrc:logo
    }
  },
  methods: {
    handleJSError() {
      // try {
      //   this.test();
      // } catch (err) { 
      //   monitor.errorCaptured(err,"js同步错误")
      // }
      let str = null;
      console.log(str.length);
    },
    handlePromiseError() {
      return Promise.reject(Error('promise'))
    },
    handleResourceError() { 
      this.imgSrc = "https://xxx.png"
    }
  }
}
</script>

