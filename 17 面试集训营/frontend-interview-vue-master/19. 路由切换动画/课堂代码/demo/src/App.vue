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
      <transition :name="routerSwitchInfo.direction">
        <router-view />
      </transition>
    </div>
    <div class="border-solid border-t mt-10 text-center py-10 bg-gray-100">
      Footer
    </div>
  </div>
</template>

<script>
import store from './store';

export default {
  data() {
    return {
      routerSwitchInfo: store.routerSwitch,
    };
  },
};
</script>

<style scoped>
.right-leave-active {
  position: absolute;
  width: 100%;
  transition: 0.5s;
  transform: translateX(-50%);
  opacity: 0;
}
.right-enter {
  transform: translateX(50%);
  opacity: 0;
}
.right-enter-active {
  transition: 0.5s;
}

.left-leave-active {
  position: absolute;
  width: 100%;
  transition: 0.5s;
  transform: translateX(50%);
  opacity: 0;
}
.left-enter {
  transform: translateX(-50%);
  opacity: 0;
}
.left-enter-active {
  transition: 0.5s;
}
</style>
