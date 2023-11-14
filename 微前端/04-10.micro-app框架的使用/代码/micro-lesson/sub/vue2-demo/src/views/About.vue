<template>
  <div>
    <h2>About页面</h2>
    <button @click="sendData">子应用反馈的数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    sendData() { 
      console.log(window);
      window.microApp.dispatch({
        type: "子应用发送的数据",
        path: "/app-react-demo/about"
      })
    }
  }
};
</script>

<style scoped></style>
