<template>
  <div class="season">
    <button class="btn-primary" @click="handleChange" value="spring">春</button>
    <button class="btn-primary" @click="handleChange" value="summer">夏</button>
    <button class="btn-primary" @click="handleChange" value="autumn">秋</button>
    <button class="btn-primary" @click="handleChange" value="winter">冬</button>
  </div>

  <div class="card">
    <!-- <img src="@/assets/summer.jpg" alt=""> -->
    <!-- <img :src="spring" alt=""> -->
    <!-- <img :src="spring" alt=""> -->

    <!-- 使用import动态导入的方式 -->
    <!-- <img :src="imgPath" alt=""> -->

    <!-- 使用new URL的方式处理 -->
    <img :src="url" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
// import spring from "@/assets/spring.jpg";

// 直接引入变量的方式是没有效果的，vite并不会帮我们去解析路径
// const spring = ref('/src/assets/spring.jpg');

// import spring from '@/assets/spring.jpg';
// const imgPath = ref(spring);
// const handleChange = (e:Event) => { 
//   const v = (e.target as HTMLButtonElement).value;
//   import(`@/assets/${v}.jpg`).then((res) => { 
//     console.log(res);
//     imgPath.value = res.default;
//   })
// }

// 使用new URL的方式处理变量的静态资源路径
const imgPath = ref('spring');
// 计算属性处理URL地址
const url = computed(() => { 
  const href = new URL(`../assets/${imgPath.value}.jpg`, import.meta.url).href;
  
  console.log("🚀 ~ href:", href)

  return href;
})
// 事件切换路径字符串
const handleChange = (e:Event) => { 
  const v = (e.target as HTMLButtonElement).value;
  imgPath.value = v;
}


</script>

<style scoped lang="scss">
.season {
  padding-top: 30px;
  /* height: 100vh;
  background-image: url(../assets/spring.jpg); */
  background-size: cover;
  background-position: center;
  transition: background-image 0.3s;
}
.btn-primary {
  background-color: #00a0e9;
  border-color: #00a0e9;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  cursor: pointer;
  outline: none;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: #008cc4;
    border-color: #008cc4;
  }
  &:focus {
    background-color: #0077b3;
    border-color: #0077b3;
  }
}
.card {
  display: inline-block;
  margin: 16px;
  width: 50%;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: 0 0 3rem -1rem rgba(0, 0, 0, 0.5);
  transition: transform 0.3s;
  img {
    max-width: 100%;
    object-fit: cover;
  }
  &:hover {
    transform: translateY(-0.5rem) scale(1.0125);
    box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);
  }
}
</style>
