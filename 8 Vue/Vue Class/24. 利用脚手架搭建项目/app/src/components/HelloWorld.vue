<template>
  <div class="hello" @mouseover="handleenter">
  dawdkjnawkjndweddfdsfsdf
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    handleenter(e) {
      // eslint-disable-next-line no-console
    console.log(e.screenX+" "+e.screenY)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
