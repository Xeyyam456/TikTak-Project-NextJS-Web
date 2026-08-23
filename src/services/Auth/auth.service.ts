import type { ApiResponse, AuthResponseData, AuthTokens, LoginPayload, SignupPayload } from '@/types'
import httpClient from '../httpClient'

export const authService = {
  login(payload: LoginPayload) {
    return httpClient.post<ApiResponse<AuthResponseData>>('/auth/login', payload)
  },
  signup(payload: SignupPayload) {
    return httpClient.post<ApiResponse<null>>('/auth/signup', payload)
  },
  refresh(refresh_token: string) {
    return httpClient.post<ApiResponse<AuthTokens>>('/auth/refresh', { refresh_token })
  },
}
