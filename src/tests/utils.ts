import userEvent from '@testing-library/user-event';
import { render, type RenderOptions, type RenderResult } from '@testing-library/vue';
import type { Component } from 'vue';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect as vitestExpect, it } from 'vitest';
import { screen } from '@testing-library/vue';

// Importer le module PrimeVue
// import PrimeVueModule from '@/modules/primevue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

// Étendre expect avec les matchers de @testing-library/jest-dom
vitestExpect.extend(matchers);

// Exporter expect étendu et it de vitest
export const expect = vitestExpect;
export { it, screen };

// Définir le type de retour pour la fonction setup
type SetupReturn = RenderResult & { user: ReturnType<typeof userEvent.setup> };

export const setup = (component: Component, { renderOptions }: { renderOptions?: RenderOptions<Component> } = {}): SetupReturn => {
    const result = render(component, {
        global: {
            plugins: [PrimeVue, ToastService],
            components: { Toast },
            ...renderOptions?.global
        },
        ...renderOptions
    });

    const user = userEvent.setup();

    return {
        ...result,
        user
    };
};
