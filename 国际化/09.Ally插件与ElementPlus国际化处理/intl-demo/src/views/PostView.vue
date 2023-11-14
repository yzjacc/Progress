<template>
  <div class="list">
    <div class="card" v-for="(post,index) in posts" :key="post._id">
      <div class="cover">
        <img :src="'https://picsum.photos/200/300?random=' + index">
      </div>
      <div class="post">
        <div class="title">{{ post.title }}</div>
        <div class="content">
          {{ post.content }}
        </div>
        <div class="author">
          <span>--- {{ post.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getPostList } from "@/apis/postApis";
import { Post } from "@/apis/interface"

const posts = ref<Post[]>([]);

getPostList().then(res => {
  posts.value = res;
})

</script>

<style scoped>
.list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card{
  display: flex;
  width: 30%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}
.cover{
  padding: 10px;;
}
.cover img{
  border-radius: 5px;
  box-shadow: 3px 4px 4px 2px #ccc;
}
.post{
  position: relative;
}
.title{
  font-size: 20px;
  font-weight: bold;
  margin: 5px 5px 10px 5px;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content{
  margin: 0 5px 5px 5px;
  max-height: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 1.5;
}
.author{
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-align: right;
  color: #aaa;
}
</style>