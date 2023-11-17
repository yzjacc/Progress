<template>
  <div class="modal" id="modal">
    <!-- 遮罩层 -->
    <div class="mask" id="mask"></div>
    <!-- 编辑内容区 -->
    <div class="modal-content">
      <h3>编辑信息</h3>
      <form id="edit-form">
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
          <input type="submit" class="btn" id="edit-submit-btn" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>