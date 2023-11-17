<template>
  <div id="app" class="wrapper">
    <system-header></system-header>
    <left-menu></left-menu>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import systemHeader from "./components/systemHeader.vue";
import leftMenu from "./components/leftMenu.vue";
export default {
  components: {
    systemHeader,
    leftMenu,
  }
};
</script>

<style>
@import url(./index.css);
</style>