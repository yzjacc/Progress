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
            <h2 class="text-color">基座应用</h2>
            <router-view></router-view>
          </el-main>
        </el-container>
        
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.text-color{
  color:red
}
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
</style>
