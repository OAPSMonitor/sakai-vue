import type {AxiosResponse} from 'axios'
import apiClient from '@/services/HttpBaseService'
import type {AutomationStatus} from '@/interfaces/AutomationStatus'
import {API_PATHS} from '@/constants/apiURLs'

class AutomationStatusService {
  async getAutomationStatus(): Promise<AutomationStatus> {
    const {data}: AxiosResponse<AutomationStatus> = await apiClient.get(
        API_PATHS.AUTOMATION_STATUS,
    )
    return data
  }

  async changeAutomationStatus(
      input: AutomationStatus,
  ): Promise<AutomationStatus> {
    const {data}: AxiosResponse<AutomationStatus> = await apiClient.put(
        API_PATHS.AUTOMATION_STATUS,
        input,
    )
    return data
  }
}

export default new AutomationStatusService()
