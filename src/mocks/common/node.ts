import {setupServer} from 'msw/node'
import {handlers} from '@/mocks/common/handlers'
import {getAutomationStatusHandler, setAutomationStatusHandler} from '@/mocks/handlers/AutomationStatus'

export const mockServer = setupServer(...handlers)

/* AutomationStatus */
export function setupGetAllowedAutomation() {
  mockServer.use(...getAutomationStatusHandler(true))
}

export function setupGetNotAllowedAutomation() {
  mockServer.use(...getAutomationStatusHandler(false))
}

export function setupSetAllowedAutomation() {
  mockServer.use(...setAutomationStatusHandler(true))
}

export function setupSetNotAllowedAutomation() {
  mockServer.use(...setAutomationStatusHandler(false))
}
