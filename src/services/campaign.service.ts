import type { ApiResponse, Campaign } from '@/models'
import httpClient from './httpClient'

export const campaignService = {
  list() {
    return httpClient.get<ApiResponse<Campaign[]>>('/campaigns')
  },
}
