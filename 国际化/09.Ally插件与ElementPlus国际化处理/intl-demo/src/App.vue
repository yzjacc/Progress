<script setup lang="ts">
import Nav from './components/Nav.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import Trans from "@/i18n/translation";
import { computed } from 'vue';

const locale = computed(() => { 
  const lang = Trans.currentLocale;
  return lang === 'zh-CN' ? zhCn : en
});

</script>

<template>
  <div>
    <Nav/>
    <LanguageSwitcher />
    <div>
      <el-config-provider :locale="locale">
        <router-view/>
      </el-config-provider>
      
    </div>
  </div>
</template>
