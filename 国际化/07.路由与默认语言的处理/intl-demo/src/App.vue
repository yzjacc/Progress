<script setup lang="ts">
import Nav from './components/Nav.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue';
</script>

<template>
  <div>
    <Nav/>
    <LanguageSwitcher />
    <div>
      <router-view/>
    </div>
  </div>
</template>
