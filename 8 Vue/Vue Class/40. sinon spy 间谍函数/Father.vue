<template>
  <div>
    <son 
      :name="name"
      :age="age"
      :fn="changeAge"
      @show="showInfo"
    />
    <div
      class='info'
      v-if="show"
      :style="{
        margin: '20px 0',
        padding: '50px 0',
        border: '1px solid red'
      }"
    >
      姓名：杉杉<br />
      年龄：{{ age }}<br />
      性别：女<br />
      爱好：男<br />
      长相：秀色可餐
    </div>
  </div>
</template>


<script>
import Son from './Son';
export default {
  components: {
    Son
  },
  data () {
    return {
      name: '杉杉',
      age: 18,
      show: false
    }
  },
  methods: {
    showInfo () {
      this.show = true;
    },
    changeAge () {
      this.age = 16;
    }
  }
}
</script>
