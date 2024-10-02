<template>
    <div>
        <h1>{{ message }}</h1>
        <Button @click="updateMessage">Update Message</Button>
    </div>
</template>

<script setup lang="ts">
// import Button from 'primevue/button';
import { ref } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const message = ref('Hello, world!');
const toast = useToast();

const updateMessage = () => {
    message.value = 'Hello, Vue 3 with TypeScript!';
    toast.add({ severity: 'success', summary: 'Message Updated', detail: 'The message has been updated successfully.' });
};
</script>

<style scoped>
h1 {
    color: #42b983;
}
</style>
