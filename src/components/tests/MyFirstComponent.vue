<template>
    <div>
        <h1>{{ message }}</h1>
        <Button @click="updateMessage">Update Message</Button>
    </div>
</template>

<script setup lang="ts">
// import Button from 'primevue/button';
import { ref } from 'vue';

const message = ref('Hello, world!');

const updateMessage = () => {
    message.value = 'Hello, Vue 3 with TypeScript!';
};
</script>

<style scoped>
h1 {
    color: #42b983;
}
</style>
