<template>
  <div>
    <button @click="$monitor.tracker">手动上报</button>
    <button data-tracker="true">data-set自动上报</button>
    <button>auto自动上报</button>
  </div>
</template>

<script>
export default {
}
</script>

