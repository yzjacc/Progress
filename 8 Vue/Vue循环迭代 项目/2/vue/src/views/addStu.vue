<template>
  <!-- 新增学生展示区域 -->
  <div class="add-student content" id="add-student">
    <form id="add-student-form">
      <div>
        <label for="name">姓名</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label for>性别</label>
        <input type="radio" name="sex" id="male" value="0" checked />
        <label for="male" class="label-sex">男</label>
        <input type="radio" name="sex" id="female" value="1" />
        <label for="female" class="label-sex">女</label>
      </div>
      <div>
        <label for="sNo">学号</label>
        <input type="text" id="sNo" name="sNo" />
      </div>
      <div>
        <label for="email">邮箱</label>
        <input type="text" id="email" name="email" />
      </div>
      <div>
        <label for="birth">出生年</label>
        <input type="text" id="birth" name="birth" />
      </div>
      <div>
        <label for="phone">手机号</label>
        <input type="text" id="phone" name="phone" />
      </div>
      <div>
        <label for="address">住址</label>
        <input type="text" id="address" name="address" />
      </div>
      <div>
        <label for></label>
        <input type="submit" class="btn" id="add-student-btn" />
        <input type="reset" class="btn" />
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>