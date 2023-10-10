<template>
    <div>
        <!-- 渲染待办事项每一条项目 -->
        <div v-for="todo in todos" :key="todo.id" data-test="todo">
            {{ todo.text }}
        </div>

        <form data-test="form" @submit.prevent="createTodo">
            <input data-test="new-todo" v-model="newTodo" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const newTodo = ref("");
// 默认的待办事项
const todos = ref([
    {
        id: 1,
        text: 'Learn Vue.js 3',
        completed: false
    }
]);
function createTodo() {
    todos.value.push({
        id: 2,
        text: newTodo.value,
        completed: false
    });
    newTodo.value = "";
}
</script>

<style scoped></style>