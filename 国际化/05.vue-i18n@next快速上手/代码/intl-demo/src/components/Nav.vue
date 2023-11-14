<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">{{ $t("nav.home") }}</router-link>
        </li>
        <li>
          <router-link to="/about">{{ $t("nav.about") }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

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
