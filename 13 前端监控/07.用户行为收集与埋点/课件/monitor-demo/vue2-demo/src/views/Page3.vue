<template>
  <div>
    <button @click="handleClick">手动上报</button>
    <button data-tracker="true">data-set属性上报</button>
    <button>auto自动上报</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$monitor.tracker(e)
      console.log('手动上报')
    }
  },
}
</script>

