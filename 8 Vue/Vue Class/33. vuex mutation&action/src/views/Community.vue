<template>
  <div class="community">
    <ul class="nav">
      <router-link tag="li" to="/community/academic">学术讨论</router-link>
      <router-link tag="li" :to="{path: '/community/download'}">资源下载</router-link>
      <router-link tag="li" :to="{name: 'personal'}">个人中心</router-link>
    </ul>

    <router-view class="router-view"></router-view>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
}

.nav li {
  margin-right: 30px;
  cursor: pointer;
  padding: 10px 20px;
}

.active-exact {
  background-color: #38f;
  color: #fff;
}

.router-view {
  padding-top: 20px;
  padding-left: 20px;
}
</style>
