<template>
  <div>
    <HelloWorld :msg="msg"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
export default {
  data () {
    return {
      msg:"基座应用 Hello"
    }
  },
  components: {
    HelloWorld
  },
}
</script>

<style scoped>

</style>
