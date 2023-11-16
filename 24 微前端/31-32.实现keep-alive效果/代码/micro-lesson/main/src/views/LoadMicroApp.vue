<template>
  <div class="container">
    <div ref="microVue2App" class="item"></div>
    <div ref="microReactApp" class="item"></div>
  </div>
</template>

<script>
import {loadMicroApp} from 'qiankun';
export default {
  name: 'LoadMicroApp',
  data () {
    return {
      microVue2App: null,
      microReactApp: null,
    }
  },
  mounted(){
    this.microVue2App = loadMicroApp({
      name: 'app-vue2-load-demo',
      entry: '//localhost:4001',
      container: this.$refs.microVue2App,
      props:{
        routerBase:'/loadMicroApp',
        pushState:'/about'
      }
    });
    this.microReactApp = loadMicroApp({
      name: 'app-react-load-demo',
      entry: '//localhost:4002',
      container: this.$refs.microReactApp,
      props:{
        routerBase:'/loadMicroApp',
        pushState:'/info'
      }
    })
  },
  destroyed(){
    this.microVue2App && this.microVue2App.unmount();
    this.microReactApp && this.microReactApp.unmount();
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item{
  width: 49%;
  height: 450px;
  border: 1px solid #ccc;
}
</style>