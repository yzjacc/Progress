<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="usernameInput">Username</label>
                <input id="usernameInput" v-model="username" />
            </div>
            <div>
                <label for="passwordInput">Password</label>
                <input id="passwordInput" type="password" v-model="password" />
            </div>
            <button type="submit">Submit{{ state.loading ? '...' : null }}</button>
        </form>
        <div v-if="state.error" role="alert">{{ state.error }}</div>
        <div v-if="state.resolved" role="alert">Congrats! You're signed in!</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface LoginState {
    resolved: boolean
    loading: boolean
    error: string | null
}

const username = ref('')
const password = ref('')
const state = ref<LoginState>({
    resolved: false,
    loading: false,
    error: null,
})

function handleSubmit() {
    state.value.loading = true;
    state.value.resolved = false;
    state.value.error = null;

    window.fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    })
        .then((r) =>
            r.json().then((data) => (r.ok ? data : Promise.reject(data)))
        )
        .then(
            (user) => {
                state.value.loading = false;
                state.value.resolved = true;
                state.value.error = null;
                localStorage.setItem('token', user.token);
            },
            (error) => {
                state.value.loading = false;
                state.value.resolved = false;
                state.value.error = error.message;
            }
        );
}
</script>

<style scoped></style>