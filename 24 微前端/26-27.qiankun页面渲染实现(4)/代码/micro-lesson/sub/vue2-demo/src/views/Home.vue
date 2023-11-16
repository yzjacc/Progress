<template>
  <div>
    <HelloWorld :msg="msg"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: 'Vue2 Demo子程序'
    }
  }
}
</script>

<style scoped>

</style>
