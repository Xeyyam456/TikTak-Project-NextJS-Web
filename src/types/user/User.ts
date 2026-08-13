import type { UserRole } from './UserRole'

export interface User {
  id: number
  full_name: string
  phone: string
  email: string | null
  address: string | null
  img_url: string | null
  role: UserRole
  created_at: string
}
