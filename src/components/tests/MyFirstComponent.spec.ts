import { setup, it, expect, screen } from '@/tests/utils';

import { describe } from 'vitest';

// import { mount } from '@vue/test-utils';
// import { describe, it, expect } from 'vitest';
import MyFirstComponent from '@/components/tests/MyFirstComponent.vue';

describe('HelloWorld', () => {
    it('renders properly', async () => {
        const { user } = setup(MyFirstComponent);

        // const wrapper = mount(MyFirstComponent);
        // expect(wrapper.text()).toContain('Hello, world!');

        expect(await screen.findByText('Hello, world!')).toBeVisible();
        const element = screen.getByText('Hello, world!');
        expect(element).toBeInTheDocument();

        const button = await screen.findByRole('button');
        await user.click(button);
        screen.debug();
        expect(await screen.findByText('Hello, Vue 3 with TypeScript!')).toBeVisible();
        const toast = await screen.findByText('Message Updated');
        expect(toast).toBeVisible();
    });
});
