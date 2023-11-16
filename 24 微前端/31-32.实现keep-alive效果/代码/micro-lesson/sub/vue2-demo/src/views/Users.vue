<template>
  <div>
    <h2>Users页面</h2>
    <input type="text">
    <br><br>
    <button @click="handleChangeState">修改全局状态</button>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
    }
  },
  methods:{
    handleChangeState(){
      this.$parentProps.setGlobalState({
        type:'子应用users页面修改全局状态',
        books:[
          {id:8,name:'javascript高级程序设计1',price:80},
          {id:9,name:'javascript高级程序设计2',price:82}
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
