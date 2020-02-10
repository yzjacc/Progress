<template>
  <ul class="acedemic">
    <!-- 动态路由 :to="{name: 'question', params: {id: question.questionId}}"
    params 传递参数（携带信息）
    动态路由时 跳转时path方式无效  -->
    <router-link
      tag="li"
      :to="{name: 'question', params: {id: question.questionId}}"
      v-for="question in questionList"
      :key="question.questionId"
    >
      {{ question.title }}
    </router-link>
  </ul>
</template>

<script>
export default {
  // Enter 中 this 是 undefined
  beforeRouteEnter (to, from, next) {
    // console.log(this);
    //如果想使用组件的数据 可以在next中使用 参数是组件实例
    next(vm => {
      // console.log(vm);
    });
  },
  data () {
    return {
      questionList: [
        {
          questionId: 201801,
          title: "到底什么是es6中的class（类）？怎么实现class（类）？"
        },
        {
          questionId: 201802,
          title:
            "什么是es6箭头函数？与普通函数主要区别在哪里？到底该不该使用箭头函数？"
        },
        {
          questionId: 201803,
          title:
            "什么是es6的解构赋值，每次都创建一个对象吗？会加重GC的负担吗？为什么？"
        }
      ]
    }
  }
}
</script>

<style scoped>
li {
  margin-bottom: 20px;
}
</style>
