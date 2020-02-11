<template>
  <div class="student-list">
    <div>学生列表：</div>
    <ul>
      <li
        v-for="student in studentList"
        :key="student.id"
      >
        姓名：{{ student.name }}
        年龄：{{ student.age }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    // studentList(){
    //   return this.$store.state.studentList
    // } 与下行相等
    // 如果计算属性与data中属性重名时 可以采用
    // ...mapState({
    //   storeStudentList:state => state.StudentList
    // })

    ...mapState(['studentList'])
  }
}
</script>

<style scoped>
ul {
  margin-top: 15px;
}

li {
  margin-bottom: 15px;
}
</style>


