<template>
  <div class="add-student">
    <div>添加学生：{{ newPerson }}</div>
    <div>姓名：<input type="text" v-model="name" /></div>
    <div>年龄：<input type="text" v-model="age" /></div>
    <div><button @click="handleClick">添加</button></div>
    <hr />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data () {
    return {
      name: '',
      age: null
    }
  },
  methods: {
    // ...mapMutations(['changeStudentList']),
    ...mapActions(['changeStudentList']),
    handleClick () {
      const tempObj = {
        name: this.name,
        age: this.age,
        id: +new Date()
      }
      console.log(tempObj);
      // this.$store.state.studentList.push(tempObj);
      // 触发方法
      // this.$store.commit('changeStudentList', {tempObj, name: '渡一'});
      this.changeStudentList({tempObj, name: '渡一'})
      // this.$store.dispatch('changeStudentList', {tempObj, name: '渡一'})
      // this.changeStudenList
    }
  },
  computed: {
    // ...mapGetters(['person'])
    ...mapGetters({
      newPerson: 'person'
    })
  }
}
</script>


<style scoped>
div {
  margin-bottom: 15px;
}
</style>
