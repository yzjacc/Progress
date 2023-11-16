<template>
  <div id="app">
    <h2 class="text-color">vue2-demo 子应用 首页</h2>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <span>用户信息</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <span>关于我们</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "App",
  computed: {
    activeIndex() {
      return this.$route.path;
    },
    window() { 
      return window.rawWindow;
    }
  },
  created() { 
    // console.log(window);
    // console.log(this.window);
    // console.log(_);
  }
};
</script>

<style>
.text-color{ 
  color:blue
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
