<template>
  <div>
    <h2>About页面</h2>
    <button @click="handleRouter">跳转到react子应用的About页面</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    handleRouter(){
      // window.history.pushState(null,'','/app-react-demo/about')
      this.$parentProps.mainRouter.push('/app-react-demo/about');
    }
  }
};
</script>

<style scoped></style>
