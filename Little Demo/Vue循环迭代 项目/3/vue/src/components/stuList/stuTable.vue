<template>
  <table>
    <thead>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>邮箱</th>
        <th>年龄</th>
        <th>手机号</th>
        <th>住址</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody id="table-body">
      <tr v-for="(item, index) in list" :key="index">
        <td>{{ item.sNo }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.sex == 0 ? '男' : '女' }}</td>
        <td>{{ item.email }}</td>
        <td>{{ countAge(item.birth) }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
        <td>
          <button class="btn edit" @click="edit(item)">编辑</button>&nbsp;
          <button class="btn del" @click="deleteStu(item.sNo)">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  created() {
    this.getList({ page: 1, size: 5 });
  },

  methods: {
    countAge(birth) {
      return new Date().getFullYear() - birth;
    },
    deleteStu(sNo) {
       this.delStu(sNo).then(data => {
         this.$toast(data)
       })
    },
    edit(item) {
      this.setModal(true);
      this.setEditStu(item);
    },
    ...mapActions(["getList", "delStu"]),
    ...mapMutations(["setModal", "setEditStu"])
  },
  computed: {
    ...mapState({
      list: state => state.list
    })
  }
};
</script>

<style>
</style>