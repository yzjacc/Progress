<template>
  <div>
    <h2>welcome!!</h2>
    <button @click="handleCounter">count is {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue" 
const count = ref(0);
const handleCounter = () => {
  count.value++;
};
</script>

<style scoped>
</style>