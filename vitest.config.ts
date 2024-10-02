import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            // deps: {
            //     inline: ['@primevue/auto-import-resolver'] // Indiquer à Vitest de gérer ce module comme un ESM
            // },
            clearMocks: true,
            css: true,
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/**'],
            root: fileURLToPath(new URL('./', import.meta.url)),
            globals: true,
            setupFiles: ['./src/tests/vitest.setup.ts']
        }
    })
);
