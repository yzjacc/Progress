<template>
  <div>
    <!-- 
    <h2>welcome!!</h2>
    <input type="text" @input="handleInput">
    <button @click="handleCounter">count is {{ count }}</button> 
    -->
    <NotFound />
  </div>
</template>

<script setup lang="ts">
/*
import { ref } from "vue" 
import { debounce } from "lodash-es";
const count = ref(0);
const handleCounter = () => {
  count.value++;
};
const handleInput = debounce((e:Event) => {
  console.log((e.target as HTMLInputElement).value);
}, 1000);
*/

import NotFound from './views/NotFound.vue';
</script>

<style scoped>
</style>