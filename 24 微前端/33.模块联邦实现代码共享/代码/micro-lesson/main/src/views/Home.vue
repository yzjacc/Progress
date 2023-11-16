<template>
  <div>
    <VueMFP />
    <VueMFP2 />
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
    VueMFP: () => import('app1/Users'),
    VueMFP2: () => import('app1/Statistic')
  }
}
</script>

<style scoped>

</style>
