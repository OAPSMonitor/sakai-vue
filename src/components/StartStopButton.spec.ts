import {beforeEach, describe, expect, it, screen, setup} from '@/tests/utils'
import StartStopButton from '@/components/StartStopButton.vue'

describe('StartStopButton', () => {
    beforeEach(() => {
        setup(StartStopButton, {
            renderOptions: {
                props: {
                    isRunning: false,
                    isAllowed: false,
                },
            },
        })
    })

    it('should mount the component', () => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    it('renders a button with label START', () => {
        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('START')
    })

    it('disables the button when isAllowed is false', () => {
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
    })
})

describe('Button behavior', () => {
    it('initializes the button based on isRunning TRUE in props', () => {
        setup(StartStopButton, {
            renderOptions: {
                props: {
                    isRunning: true,
                    isAllowed: true,
                },
            },
        })
        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('STOP')
    })

    it('initializes the button based on isRunning FALSE in props', () => {
        setup(StartStopButton, {
            renderOptions: {
                props: {
                    isRunning: false,
                    isAllowed: true,
                },
            },
        })
        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('START')
    })

    it('does not toggle status on click if not allowed', async () => {
        const {user} = setup(StartStopButton, {
            renderOptions: {
                props: {
                    isRunning: false,
                    isAllowed: false,
                },
            },
        })
        const button = screen.getByRole('button')
        await user.click(button)
        expect(button).toHaveTextContent('START')
    })
})

describe('Emitter', () => {
    it('should emit status-changed with TRUE when button is toggled and status is FALSE', async () => {
        const result = setup(StartStopButton, {
            renderOptions: {
                props: {
                    isRunning: false,
                    isAllowed: true,
                },
            },
        })
        const emitted = result.emitted // Récupère les événements émis pour vérification
        const button = screen.getByRole('button')
        const user = result.user
        await user.click(button)
        expect(emitted()['status-changed']).toBeTruthy()
        expect(emitted()['status-changed'][0]).toEqual([true])
    })

    it('should emit status-changed with FALSE when button is toggled and status is TRUE', async () => {
        const result = setup(StartStopButton, {
            renderOptions: {
                props: {
                    isRunning: true,
                    isAllowed: true,
                },
            },
        })
        const emitted = result.emitted // Récupère les événements émis pour vérification
        const button = screen.getByRole('button')
        const user = result.user
        await user.click(button)
        expect(emitted()['status-changed']).toBeTruthy()
        expect(emitted()['status-changed'][0]).toEqual([false])
    })
})
