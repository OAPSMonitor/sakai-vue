<script setup lang="ts">
import {onBeforeMount, onUnmounted, ref} from 'vue'
import type {PropType} from 'vue'
import StartStopButton from '@/components/StartStopButton.vue'
import AutomationStatusService from '@/services/AutomationStatusService'
import type {AutomationStatus} from '@/interfaces/AutomationStatus'

const props = defineProps({
  isAllowed: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
})

const isRunning = ref(false)
let intervalId: number | undefined

async function fetchAutomationStatus() {
  try {
    const status: AutomationStatus = await AutomationStatusService.getAutomationStatus()
    isRunning.value = status.isAllowed
  } catch (error) {
    console.error('Failed to fetch automation status:', error)
  }
}

async function toggleAutomationStatus() {
  if (!props.isAllowed) {
    console.warn('User is not allowed to change automation status')
    return
  }
  try {
    const newStatus: AutomationStatus = { isAllowed: !isRunning.value }
    const updatedStatus: AutomationStatus = await AutomationStatusService.changeAutomationStatus(newStatus)
    isRunning.value = updatedStatus.isAllowed
  } catch (error) {
    console.error('Failed to change automation status:', error)
  }
}

onBeforeMount(async () => {
  await fetchAutomationStatus()
  intervalId = window.setInterval(fetchAutomationStatus, 5000)
})

onUnmounted(() => {
  if (intervalId)
    clearInterval(intervalId)
})
</script>

<template>
  <div>
    <StartStopButton :is-running="isRunning" :is-allowed="props.isAllowed" @status-changed="toggleAutomationStatus"/>
  </div>
</template>

<style scoped>
/* Ajoutez vos styles ici */
</style>
