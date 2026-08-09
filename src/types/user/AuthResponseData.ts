import type { AuthTokens } from './AuthTokens'
import type { User } from './User'

export interface AuthResponseData {
  tokens: AuthTokens
  profile: User
}
