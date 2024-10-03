<script setup lang="ts">
import MyFirstComponent from '@/components/tests/MyFirstComponent.vue';
import StatisticCard from '@/components/StatisticCard.vue';
import StartStopButton from '@/components/StartStopButton.vue';
import AutomationStatus from '@/components/AutomationStatus.vue';

const styles = ['style-blue', 'style-orange', 'style-green'];

function getRandomStyle() {
    return styles[Math.floor(Math.random() * styles.length)];
}

</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Empty Page</div>
        <p>Use this page to start from scratch and place your custom content.</p>
        <MyFirstComponent class="mb-8"/> <!-- Add margin bottom class here -->
        <div class="grid grid-cols-12 gap-4">
            <!-- First Card spanning two rows -->
<!--            <div class="col-span-12 sm:col-span-6 md:col-span-3 row-span-2">
                <StartStopButton :is-allowed="true" :is-running="true" />
            </div>-->
            <!-- Remaining Cards -->
            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                <StatisticCard title="Card 2" :number="Math.floor(Math.random() * 1000)" :styleClass="getRandomStyle()" />
            </div>
            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                <StatisticCard title="Card 3" :number="Math.floor(Math.random() * 1000)" :styleClass="getRandomStyle()" />
            </div>
            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                <StartStopButton :is-allowed="true" :is-running="false" />
            </div>
            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                <StatisticCard title="Card 5" :number="Math.floor(Math.random() * 1000)" :styleClass="getRandomStyle()" />
            </div>
            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                <StatisticCard title="Card 6" :number="Math.floor(Math.random() * 1000)" :styleClass="getRandomStyle()" />
            </div>
            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                <StatisticCard title="Card 7" :number="Math.floor(Math.random() * 1000)" :styleClass="getRandomStyle()" />
            </div>
        </div>
        <div class="mb-8">
            <AutomationStatus :is-allowed="true" />
        </div>
    </div>
</template>
