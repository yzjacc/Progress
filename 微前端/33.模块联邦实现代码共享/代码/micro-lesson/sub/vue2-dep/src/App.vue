<template>
  <div id="app">
    <Users></Users>
    <Statistic></Statistic>
  </div>
</template>

<script>
import Users from './views/Users.vue'
import Statistic from './views/Statistic.vue';
export default {
  name: 'App',
  components: {
    Users,Statistic
  },
}
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
</style>
