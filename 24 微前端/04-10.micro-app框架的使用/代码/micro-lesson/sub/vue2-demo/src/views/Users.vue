<template>
  <div>
    <h2>Users页面</h2>
    <ul>
      <li v-for="user in users" :key="user._id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
import { getUsers } from "@/apis/userApi";
export default {
  data () {
    return {
      users:[]
    }
  },
  async created() { 
    let result = await getUsers();
    console.log(result);
    this.users = result.data;
  }
}
</script>

<style scoped>

</style>
