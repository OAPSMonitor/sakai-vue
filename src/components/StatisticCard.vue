<script setup lang="ts">
import { consola } from 'consola';
const props = defineProps({
    title: {
        type: String,
        required: true // La prop `title` est obligatoire
    },
    number: {
        type: Number,
        required: true // La prop `title` est obligatoire
    },
    styleClass: {
        type: String,
        default: 'style-blue' // Style par défaut
    }
});
consola.info(props.number);
</script>

<template>
    <Card data-testid="statistic-card" :class="['statistic-card', styleClass]">
        <!-- Titre de la card -->
        <template #title>
            <div class="card-title">{{ props.title }}</div>
        </template>
        <template #content>
            <p class="m-0">{{ props.number }}</p>
        </template>
    </Card>
</template>

<style scoped>
/* Styles de base de la carte */
.statistic-card {
    padding: 10px;
    border-radius: 16px;
    height: 100%;
    min-height: 150px;
    transition: all 0.3s ease;
}

/* Effet de survol */
.statistic-card:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}

/* Différents styles de cartes */
.style-blue {
    background: linear-gradient(135deg, #4f86ed 0%, #61dafb 100%);
    color: #ffffff;
}

.style-orange {
    background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
    color: #ffffff;
}

.style-green {
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    color: #ffffff;
}

/* Personnalisation des titres pour chaque style */
.style-blue .card-title {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
}

.style-orange .card-title {
    color: #ffd700; /* Or */
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
}

.style-green .card-title {
    color: #a7f3d0; /* Vert clair */
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
}

/* Style pour le nombre */
:deep(.p-card-content) {
    color: black;
    font-size: 3rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
