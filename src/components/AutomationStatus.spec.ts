import {describe, expect, it, screen, setup} from '@/tests/utils'
import AutomationStatus from '@/components/AutomationStatus.vue'
import {setupGetAllowedAutomation, setupGetNotAllowedAutomation} from '@/mocks/common/node'

describe('automationStatus Component', () => {
  it('should mount the component with a STOP button', async () => {
    setupGetAllowedAutomation()
    setup(AutomationStatus, {
      renderOptions: {
        props: {
          isAllowed: true,
        },
      },
    })

    // const stopButton = await screen.findByText('STOP')
    const stopButton = await screen.findByRole('button', {name: /stop/i})
    expect(stopButton).toHaveTextContent('STOP')
  })

  it('should mount the component with a START button', async () => {
    // Mount the component using the setup function
    setupGetNotAllowedAutomation()
    setup(AutomationStatus, {
      renderOptions: {
        props: {
          isAllowed: true,
        },
      },
    })

    // const stopButton = await screen.findByText('STOP')
    const stopButton = await screen.findByRole('button', {name: /start/i})
    expect(stopButton).toHaveTextContent('START')
  })
})
