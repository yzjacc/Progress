<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link :to="Trans.i18nRoute({name:'Home'})">{{ $t("nav.home") }}</router-link>
        </li>
        <li>
          <router-link :to="Trans.i18nRoute({name:'About'})">{{ $t("nav.about") }}</router-link>
        </li>
        <li>
          <router-link :to="Trans.i18nRoute({name:'Post'})">{{ $t("nav.post") }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts" setup>
import Trans from "@/i18n/translation";
</script>
<style scoped>
ul {
  display: flex;
  font-size: 20px;
  font-weight: bold;
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin-right: 20px;
}
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  color: #f00;
}

</style>
