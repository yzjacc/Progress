<template>
    <div>
        <label htmlFor="toggle">显示说明</label>
        <input id="toggle" type="checkbox" :checked="showMessage" @click="showMessage = !showMessage" />
        <div id="showMessage">
            <slot v-if="showMessage"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showMessage = ref(false);
</script>

<style scoped></style>