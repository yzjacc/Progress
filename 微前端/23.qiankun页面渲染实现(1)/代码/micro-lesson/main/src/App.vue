<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="/" class="el-menu-vertical-demo" router>
            <el-menu-item index="/">
              <i class="el-icon-message"></i>
              <span slot="title">导航一</span>
            </el-menu-item>
            <el-menu-item index="/app-vue2-demo">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="/app-react-demo">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="/app-vite-demo">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>Micro-App</el-header>
          <el-main>

            <button @click="handlePushState">pushState按钮</button>
            <button @click="handleReplaceState">replaceState按钮</button>
            <router-view></router-view>
            <!-- 子应用容器 -->
            <div id="subapp-container"></div>
          </el-main>
        </el-container>
        
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted(){
    // window.addEventListener('popstate',()=>{
    //   console.log("popstate触发了",window.location.pathname)
    // });
  },
  methods:{
    handlePushState(){
      // this.$router.push('/hello');
      window.history.pushState({}, '', '/hello');
    },
    handleReplaceState(){
      // this.$router.replace('/hey');
      window.history.replaceState({}, '', '/hey');
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header{
  background-color: #fafafa;
  font-size: 20px;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#nprogress .bar{
  background-color: chocolate !important;
  height: 10px !important;
}
</style>
