<template>
  <div>
    <button @click="sendDataToVue2">主应用主动发送数据给子应用</button>
    <!-- 
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:4001/index.html
      baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
     -->
     <micro-app 
      name='app-vue2-demo' 
      url='http://localhost:4001/' 
      baseroute='/app-vue2-demo'
      @created='created'
      @beforemount='beforemount'
      @mounted='mounted'
      @unmount='unmount'
      @error='error'
      :data="dataForChild"
      @datachange="handleDataChange"
     >
    </micro-app>
  </div>
</template>

<script>
import microApp from '@micro-zoe/micro-app'
export default {
  data () {
    return {
      dataForChild: {
        type:"基座发送给子应用的数据"
      }
    }
  },
  methods: {
    sendDataToVue2() { 
      microApp.setData('app-vue2-demo', {
        type: '主应用发送新的数据',
        path: '/about'
      })
    },
    handleDataChange(e) { 
      console.log('来自子应用的数据--->', e.detail.data);
      //element ui通知
      this.$notify({
        title: 'vue2子应用数据',
        message: e.detail.data.type,
        position: 'top-left'
      })
    },
    created () {
      // console.log('micro-app元素被创建');
    },
    beforemount () {
      // console.log('即将被渲染');
    },
    mounted () {
      // console.log('已经渲染完成');
    },
    unmount () {
      // console.log('已经卸载');
    },
    error () {
      // console.log('渲染出错');
    }
  }
}
</script>

<style scoped>

</style>
