<template>
    <!-- 左侧导航区域 -->
    <div class="left-menu">
      <dl id="menu-list">
        <dt>学生管理</dt>
        <router-link to="/stuList" tag="dd">学生列表</router-link>
        <router-link to="/addStu" tag="dd">新增学生</router-link>
      </dl>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>