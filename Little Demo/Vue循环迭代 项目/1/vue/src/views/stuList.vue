<template>
  <!-- 学生列表展示区域 -->
  <div class="student-list content" id="student-list">
   <search></search>
   <stu-table></stu-table>
   <turn-page></turn-page>
   <modal></modal> 
   
   
    
  </div>
</template>

<script>
import search from '../components/stuList/search.vue'
import stuTable from '../components/stuList/stuTable.vue'
import turnPage from '../components/stuList/turnPage.vue'
import modal from '../components/stuList/modal.vue'
export default {
 components: {
     search,
     stuTable, 
     turnPage,
     modal
 }
};
</script>

<style>
</style>