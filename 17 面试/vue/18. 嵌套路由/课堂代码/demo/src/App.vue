<template>
  <div>
    <div
      class="fixed bg-gray-900 text-white w-full leading-10 flex justify-center h-10"
    >
      <router-link active-class="text-yellow-600" exact class="mx-5" to="/">
        Home
      </router-link>
      <router-link active-class="text-yellow-600" class="mx-5" to="/about">
        About
      </router-link>
      <router-link active-class="text-yellow-600" class="mx-5" to="/user">
        User
      </router-link>
    </div>
    <div class="h-10"></div>
    <div class="min-h-screen py-10 lg:w-1/2 h-10 mx-auto">
      <router-view />
    </div>
    <div class="border-solid border-t mt-10 text-center py-10 bg-gray-100">
      Footer
    </div>
  </div>
</template>
