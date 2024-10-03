import { setup, it, expect, screen, describe, toastAddSpy } from '@/tests/utils';
import MyFirstComponent from '@/components/tests/MyFirstComponent.vue';

describe('HelloWorld', () => {
    it('renders properly', async () => {
        toastAddSpy.mockClear();
        const { user } = setup(MyFirstComponent);

        // const wrapper = mount(MyFirstComponent);
        // expect(wrapper.text()).toContain('Hello, world!');

        expect(await screen.findByText('Hello, world!')).toBeVisible();
        const element = screen.getByText('Hello, world!');
        expect(element).toBeInTheDocument();

        const button = await screen.findByRole('button');
        await user.click(button);
        screen.debug();

        expect(toastAddSpy).toHaveBeenCalledTimes(1);
        expect(toastAddSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                severity: 'success',
                summary: 'Message Updated',
                detail: 'The message has been updated successfully.'
            })
        );
    });
});
