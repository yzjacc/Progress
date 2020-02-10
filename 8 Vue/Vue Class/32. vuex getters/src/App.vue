<template>
  <div id="app">
    <div class="header">
      <div class="logo" @click="handleClick">渡一教育</div>
      <!-- <router-link tag="div" class="logo" to="/home">渡一教育</router-link> -->

      <ul class="nav">
        <router-link tag="li" to="/home">首页</router-link>
        <router-link tag="li" to="/learn">课程学习</router-link>
        <router-link tag="li" to="/student">学员展示</router-link>
        <router-link tag="li" :to="{name: 'about'}">关于</router-link>
        <router-link tag="li" :to="{path: '/community'}">社区</router-link>
      </ul>
    </div>
    <router-view class="view" />
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      // push replace e
      // [a, b, c, d]  => [a, b, c, e]
      // [a, b, c, d]  => [a, b, c, d, e]

      this.$router.push('/home');
      // this.$router.replace('/home');
      // [a, b, c, d, e, f, g]  d
      // this.$router.go(-1);
    }
  }
}
</script>


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

.active {
  font-weight: bold;
}
</style>
