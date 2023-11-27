<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <div class="row">
    <duyi-button>按钮</duyi-button>
    <duyi-button type="primary">primary按钮</duyi-button>
    <duyi-button type="success">success按钮</duyi-button>
    <duyi-button type="info">info按钮</duyi-button>
    <duyi-button type="danger">danger按钮</duyi-button>
    <duyi-button type="warning">warning按钮</duyi-button>
  </div>
  <div class="row">
    <duyi-button plain>按钮</duyi-button>
    <duyi-button plain type="primary">primary按钮</duyi-button>
    <duyi-button plain type="success">success按钮</duyi-button>
    <duyi-button plain type="info">info按钮</duyi-button>
    <duyi-button plain type="danger">danger按钮</duyi-button>
    <duyi-button plain type="warning">warning按钮</duyi-button>
  </div>
  <div class="row">
    <duyi-button plain round>按钮</duyi-button>
    <duyi-button plain round type="primary">primary按钮</duyi-button>
    <duyi-button round type="success">success按钮</duyi-button>
    <duyi-button plain round type="info">info按钮</duyi-button>
    <duyi-button round type="danger">danger按钮</duyi-button>
    <duyi-button plain round type="warning">warning按钮</duyi-button>
  </div>
  <div class="row">
    <duyi-button plain round circle>好</duyi-button>
    <duyi-button plain round circle type="primary">好</duyi-button>
    <duyi-button plain round circle type="success">学</duyi-button>
    <duyi-button plain round circle type="info">习</duyi-button>
    <duyi-button plain round circle type="danger">前</duyi-button>
    <duyi-button plain round circle type="warning">端</duyi-button>
  </div>
  <div class="row">
    <duyi-button disabled>按钮</duyi-button>
    <duyi-button disabled type="primary">primary按钮</duyi-button>
    <duyi-button disabled type="success">success按钮</duyi-button>
    <duyi-button disabled type="info">info按钮</duyi-button>
    <duyi-button disabled type="danger">danger按钮</duyi-button>
    <duyi-button disabled type="warning">warning按钮</duyi-button>
  </div>
  <!-- 图标 -->
  <div class="row">
    <duyi-button icon="milk-tea"></duyi-button>
    <duyi-button type="primary" icon="camera">照相机</duyi-button>
    <duyi-button type="success" icon="coffee" circle></duyi-button>
    <duyi-button type="info" icon="orange"></duyi-button>
    <duyi-button type="danger" icon="goblet"></duyi-button>
    <duyi-button type="warning" icon="cloudy"></duyi-button>
    <duyi-button type="warning" icon="milk-tea" @click="clickHandle">奶茶</duyi-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    clickHandle(){
      console.log("我是一杯奶茶");
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.row {
  width: 800px;
  margin: 20px auto;
  display: flex;
  justify-content: space-evenly;
}
</style>
