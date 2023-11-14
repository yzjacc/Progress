<template>
  <div>
    <select v-model="locale" @change="handleChange">
      <option v-for="(value,key) in Trans.supportedLocales" :key="key" :value="key">
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Trans from "@/i18n/translation";

const router = useRouter();

const { locale } = useI18n();

const handleChange = async (e:Event) => { 
  const value = (e.target as HTMLSelectElement).value;
  Trans.switchLanguage(value);

  try {
    await router.replace({ params: { locale: value } });
    //刷新页面
    router.go(0);
  } catch (e) { 
    console.log(e);
    router.push("/")
  }
  
}

</script>

<style scoped>
</style>