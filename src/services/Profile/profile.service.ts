import type { ApiResponse, UpdateProfilePayload, User } from '@/types'
import httpClient from '../httpClient'

export const profileService = {
  get() {
    return httpClient.get<ApiResponse<User>>('/profile')
  },
  update(payload: UpdateProfilePayload) {
    return httpClient.put<ApiResponse<User>>('/profile', payload)
  },
}
