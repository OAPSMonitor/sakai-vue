import { HttpResponse, http } from 'msw'
import { API_PATHS } from '@/constants/apiURLs'

export function getAutomationStatusHandler(isAllowed: boolean) {
  return [
    http.get(API_PATHS.AUTOMATION_STATUS, async () => {
      return HttpResponse.json({
        isAllowed,
      })
    }),
  ]
}

export function setAutomationStatusHandler(isAllowed: boolean) {
  return [
    http.put(API_PATHS.AUTOMATION_STATUS, async () => {
      return HttpResponse.json({
        isAllowed,
      })
    }),
  ]
}
