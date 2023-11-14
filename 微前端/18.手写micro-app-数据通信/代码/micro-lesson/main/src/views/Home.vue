<template>
  <div>
    <div>
      <button @click="showGlobalStr">点击显示globalStr</button>
    </div>
    <div>
      <!-- 这里通过data标签发送数据是同步的，但是子应用的加载是异步的 -->
      <micro-app :data="data" @datachange="handleSubData"  name="app" url="http://localhost:4002" destroy></micro-app>
    </div>

    <HelloWorld :msg="msg"/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: {
        name: 'micro-app',
        type:'微前端'
      }
    }
  },
  mounted() { 
    setTimeout(() => {
      this.data = {
        name: '---来自基座应用的数据---',
        type:'微前端'
      }
    }, 2000);
  },
  components: {
    HelloWorld
  },
  methods: {
    showGlobalStr() { 
      alert(window.globalStr)
    },
    handleSubData(e) { 
      console.log('基座接收数据:', e.detail.data);
    }
  }
}
</script>

<style scoped>

</style>
