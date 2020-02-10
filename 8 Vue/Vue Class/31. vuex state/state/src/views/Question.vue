<template>
  <div class="question">
    问题： {{ question }}
    <button
      @click="handleClick"
      v-show="nextFlag"
    >下一个问题</button>
  </div>
</template>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    this.getData(id)
    next();
  },
  mounted () {
    const id = this.$route.params.id;
    this.getData(id);;
  },
  methods: {
    handleClick () {
      this.$router.push({
        name: 'question',
        params: {
          id: this.questionId + 1
        }
      })
    },
    getData (id) {
      const index = this.questionList.findIndex(item => item.questionId === id);
      if(index !== -1) {
        this.question = this.questionList[index].title;
        this.questionId = id;
      } else {
        this.question = '没有更多问题了';
        this.nextFlag = false;
      }
    }
  },
  data () {
    return {
      nextFlag: true,
      question: '',
      questionId: null,
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
