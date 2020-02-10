<template>
  <div id="app">
    <div class="header">
      <div class="logo">渡一教育</div>
      <ul class="nav">
         <!--router-link 帮助跳转 to 表示去到哪个路径 三种方式-->
        <router-link tag="li" to="/">首页</router-link>
        <router-link tag="li" to="/learn">课程学习</router-link>
        <router-link tag="li" to="/student">学员展示</router-link>
        <router-link tag="li" :to="{name: 'about'}">关于</router-link>
        <router-link tag="li" :to="{path: '/community'}">社区</router-link>   
      </ul>
    </div>
    <router-view class="view" />
    <!--router-view 切换路径时组件应该显示在哪 -->
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 200px;
  background-color: #38f;
  line-height: 70px;
  padding-bottom: 2px;
  color: #fff;
}

.nav {
  display: flex;
}

.nav li {
  margin: 0 20px;
  cursor: pointer;
}

.view {
  padding: 50px 200px;
}

.active-exact {
  font-weight: bold;
}
</style>
