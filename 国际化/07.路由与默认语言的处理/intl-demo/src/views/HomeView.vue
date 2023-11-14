<template>
  <main>
    <h2>{{$t("home.header")}}</h2>
    <p>{{$t("home.content",{company:"DuYi-Edu"})}}</p>
    <p>{{$t("home.num_visits",30)}}</p>
    <p>{{ $d(new Date(), "longFormat") }}</p>
  </main>
</template>
<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();
</script>
