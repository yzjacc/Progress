<template>
  <div class="personal">
    姓名：<input type="text" v-model="name" />
    <button @click="handleClick">确定</button>
  </div>
</template>

<script>
// 导航守卫
export default {
  beforeRouteLeave (to, from, next) {
    if(this.name) {
      // 询问
      const flag = window.confirm('确定要离开吗？');
      if(flag) {
        this.name = '';
        next();
      }

    } else {
      next ();
    }
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    handleClick () {
      this.name = '';
    }
  }
}
</script>

<style scoped>
button {
  margin-left: 15px;
}
</style>
