import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

// Load environment variables (only in Node.js environment)
if (typeof process !== 'undefined' && process.env.NODE_ENV) {
    const dotenv = await import('dotenv');
    dotenv.config();
}

async function startApp() {
    if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('@/mocks/common/browser.ts');
        await worker.start();
    }

    const app = createApp(App);

    app.use(router);
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.app-dark'
            }
        }
    });
    app.use(ToastService);
    app.use(ConfirmationService);

    app.mount('#app');
}

startApp()
