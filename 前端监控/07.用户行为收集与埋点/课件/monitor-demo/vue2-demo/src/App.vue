<template>
  <div id="app">
    <div>
      <router-link to="/">page1</router-link>
      <router-link to="/page2">page2</router-link>
      <router-link to="/page3">page3</router-link>
      <router-link to="/page4">page4</router-link>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>
<style>
#app {
  text-align: center;
}
a {
  display: inline-block;
  margin: 10px;
  text-decoration: none;
}
a:hover {
  color: red;
}
</style>
