import {describe, expect, it} from '@/tests/utils'
import AutomationStatusService from '@/services/AutomationStatusService'
import {
  setupGetAllowedAutomation,
  setupGetNotAllowedAutomation,
  setupSetAllowedAutomation,
  setupSetNotAllowedAutomation,
} from '@/mocks/common/node'
import type {AutomationStatus} from '@/interfaces/AutomationStatus'

describe('AutomationStatusService', () => {
  it('should get automation status TRUE', async () => {
    setupGetAllowedAutomation()
    const status = await AutomationStatusService.getAutomationStatus()
    expect(status).toEqual({
      isAllowed: true,
    })
  })

  it('should get automation status FALSE', async () => {
    setupGetNotAllowedAutomation()
    const status = await AutomationStatusService.getAutomationStatus()
    expect(status).toEqual({
      isAllowed: false,
    })
  })

  it('should successfully change automation status to allowed', async () => {
    setupSetAllowedAutomation()
    const input: AutomationStatus = {isAllowed: true}
    const result = await AutomationStatusService.changeAutomationStatus(input)
    expect(result.isAllowed).toBe(true)
  })

  it('should successfully change automation status to not allowed', async () => {
    setupSetNotAllowedAutomation()
    const input: AutomationStatus = {isAllowed: false}
    const result = await AutomationStatusService.changeAutomationStatus(input)
    expect(result.isAllowed).toBe(false)
  })
})
