import type { UserRole } from '@/enums'

export interface User {
  id: number
  full_name: string
  phone: string
  address: string | null
  img_url: string | null
  role: UserRole
  created_at: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface LoginPayload {
  phone: string
  password: string
}

export interface SignupPayload {
  full_name: string
  phone: string
  password: string
}

export interface UpdateProfilePayload {
  full_name?: string
  img_url?: string
  address?: string
  password?: string
  password_repeat?: string
}

export interface AuthResponseData {
  tokens: AuthTokens
  profile: User
}
