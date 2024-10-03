import { beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { toastAddSpy } from '@/tests/utils';
import { toastEmitSpy} from '@/tests/utils';
import { mockServer} from '@/mocks/common/node';

beforeAll(() => {
    mockServer.listen({onUnhandledRequest: `error`})
})

afterAll(() => {
    mockServer.close()
})

afterEach(() => {
    mockServer.resetHandlers()
    localStorage.clear();
    sessionStorage.clear();
});

beforeEach(() => {
    toastEmitSpy.mockClear()
    vi.mock('primevue/usetoast', () => ({
        useToast: vi.fn(() => ({
            add: toastAddSpy
        }))
    }));
});
