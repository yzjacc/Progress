<template>
  <!-- 新增学生展示区域 -->
  <div class="add-student content" id="add-student">
    <form id="add-student-form">
      <div>
        <label for="name">姓名</label>
        <input type="text" id="name" name="name" v-model="user.name" />
      </div>
      <div>
        <label for>性别</label>
        <input type="radio" name="sex" id="male" value="0" v-model="user.sex" />
        <label for="male" class="label-sex">男</label>
        <input type="radio" name="sex" id="female" value="1" v-model="user.sex" />
        <label for="female" class="label-sex">女</label>
      </div>
      <div>
        <label for="sNo">学号</label>
        <input type="text" id="sNo" name="sNo" v-model="user.sNo"/>
      </div>
      <div>
        <label for="email">邮箱</label>
        <input type="text" id="email" name="email" v-model="user.email" />
      </div>
      <div>
        <label for="birth">出生年</label>
        <input type="text" id="birth" name="birth" v-model="user.birth" />
      </div>
      <div>
        <label for="phone">手机号</label>
        <input type="text" id="phone" name="phone" v-model="user.phone" />
      </div>
      <div>
        <label for="address">住址</label>
        <input type="text" id="address" name="address" v-model="user.address" />
      </div>
      <div>
        <label for></label>
        <input type="button" class="btn" id="add-student-btn" @click="commit" value="提交" />
        <input type="button" class="btn" @click="reset" value="重置" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        sex: 0,
        phone: "",
        address: "",
        birth: "",
        email: "",
        sNo: ""
      }
    };
  },
  methods: {
    commit() {
      this.$api.addStu(this.user).then(data => {
        this.$router.push('/stuList')
      })
    },
    reset() {
      this.user = {
        name: "",
        sex: 0,
        phone: "",
        address: "",
        birth: "",
        email: "",
        sNo: ""
      };
    }
  }
};
</script>

<style>
</style>