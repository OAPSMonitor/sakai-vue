<script setup lang="ts">
// import { defineProps, defineEmits } from 'vue';
// import type { PropType } from 'vue';
import Button from 'primevue/button';

// Définir les props
const props = defineProps<{
    isRunning: boolean;
    isAllowed: boolean;
}>();

// Définir les événements émis
const emit = defineEmits<{
    (e: 'status-changed', newStatus: boolean): void;
}>();

// Fonction pour basculer l'état du système
function toggleState(): void {
    if (props.isAllowed) {
        emit('status-changed', !props.isRunning);
    }
}
</script>

<template>
    <div class="custom-card">
        <div class="card-title">
            <div class="status-indicator" :class="isRunning ? 'running' : 'stopped'">
                {{ isRunning ? 'Automatisation active' : 'Automatisation arrêtée' }}
            </div>
        </div>
        <div class="card-content">
            <Button :label="isRunning ? 'STOP' : 'START'" class="circular-button" :severity="isRunning ? 'danger' : 'success'" :disabled="!isAllowed" @click="toggleState" />
        </div>
    </div>
</template>

<style scoped>
.custom-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%);
    border-radius: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.status-indicator {
    border-radius: 12px;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    margin: 15px;
    transition:
        background-color 0.5s ease,
        box-shadow 0.3s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.card-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.circular-button {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border: none;
    margin-bottom: 20px;
}

.running {
    background-color: #16a085;
}

.stopped {
    background-color: #f37b12;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

/*.content {
    background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%);
}

.system-card {
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    height: 100%;
}

.status-indicator {
    border-radius: 12px;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    margin-bottom: 20px;
    transition:
        background-color 0.5s ease,
        box-shadow 0.3s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.running {
    background-color: #16a085;
}

.stopped {
    background-color: #f39c12;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

.circular-button {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border: none;
    !* margin-top: 20px; *!
}
!*
.start {
    background: radial-gradient(circle, #4caf50 30%, #388e3c 90%);
    color: #ffffff;
}

.stop {
    background: radial-gradient(circle, #f44336 30%, #d32f2f 90%);
    color: #ffffff;
}*!*/
</style>
