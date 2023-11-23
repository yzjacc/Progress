<template>
  <div class="flex">
    <nav
      class="w-50 flex-none border-r p-10 flex flex-col leading-loose text-gray-500"
    >
      <router-link exact to="/user" active-class="text-yellow-600">
        profile
      </router-link>
      <router-link to="/user/address" active-class="text-yellow-600">
        address
      </router-link>
      <router-link to="/user/security" active-class="text-yellow-600">
        security
      </router-link>
      <router-link to="/user/friends" active-class="text-yellow-600">
        friends
      </router-link>
    </nav>
    <div class="flex-auto">
      <router-view></router-view>
    </div>
  </div>
</template>
