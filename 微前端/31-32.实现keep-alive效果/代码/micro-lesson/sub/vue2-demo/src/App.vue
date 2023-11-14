<template>
  <div id="app">
    <h2>vue2-demo 子应用 首页</h2>
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
        <keep-alive :include="loadedRouteNames">
          <router-view></router-view>
        </keep-alive>        
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {  
    return {
      loadedRouteNames:[]
    }
  },  
  computed: {
    activeIndex() {
      return this.$route.path;
    },
  },
  mounted() { 
    if(window.__POWERED_BY_QIANKUN__){
      this.$parentProps.onGlobalStateChange((state, prev) => {
        console.log("===", state);
        const { childRoute } = state['app-vue2-demo'];
        //可以使用this.$router.resolve()方法，将路由路径，解析成路由对象
        const loadedRoutes = childRoute.map(item => this.$router.resolve(item));

        const loadedRouteNames = loadedRoutes.map(item => item.route.name);
        this.loadedRouteNames = loadedRouteNames;
      }, true);
    }
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
  /* margin-top: 60px; */
}
</style>
