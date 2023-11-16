<template>
  <div>
    <HelloWorld :msg="msg"/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  data() {
    return {
      msg: "基座首页",
    }
  },
  components: {
    HelloWorld,
  }
}
</script>

<style scoped>

</style>
