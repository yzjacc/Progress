<template>
  <!-- 学生列表展示区域 -->
  <div class="student-list content" id="student-list">
   <search></search>
   <stu-table></stu-table>
   <turn-page></turn-page>
   
   
   <transition >
     <modal v-if="showModal"></modal> 
   </transition >
    
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
 },
 computed: {
   showModal() {
     return this.$store.state.showModal
   }
 }
};
</script>

<style>
 /* v-enter, v-enter-to */
 /* v-leave, v-leave-to */
 /* v-enter-active, v-leave-active */
 .v-enter {
   top: -100%;
   height: 0;
   opacity: 0;
 }
 .v-enter-to {
   top: 0;
   height: 100%;
   opacity: 1;
 }
 .v-leave {
   top: 0;
   height: 100%;
   opacity: 1;
 }
 .v-leave-to {
   top: -100%;
   height: 0;
   opacity: 0;
 }
 .v-enter-active, .v-leave-active {
   transition: all .4s;
 }
</style>