<template>
  <div>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img :src="imgUrl('/vite.svg')" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img :src="imgUrl('../assets/vue.svg')" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="子应用 -- Vite+Vue@3.x" />
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
// const vueLogo = new URL('@/assets/vue.svg', import.meta.url).href
// const viteLogo = new URL('/vite.svg', import.meta.url).href

const imgUrl = computed(() => (url: string) => new URL(url, import.meta.url).href);
</script>
<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

