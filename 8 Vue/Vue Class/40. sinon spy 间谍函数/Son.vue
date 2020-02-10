<template>
  <div>
    <h4>姓名:{{ name }}</h4>
    <h4>年龄:{{ age }}</h4>
    <button @click="showInfo">显示信息</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>


<script>
export default {
  props: ['name', 'age', 'fn'],
  methods: {
    showInfo () {
      this.$emit('show');
    },
    changeAge () {
      this.fn();
      this.fn();
    }
  }
}
</script>
