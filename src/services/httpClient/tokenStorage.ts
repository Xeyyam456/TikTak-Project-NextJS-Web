export const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

const isBrowser = () => typeof window !== 'undefined'

export function getAccessToken() {
  if (!isBrowser()) return null
  return localStorage.getItem(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  if (!isBrowser()) return null
  return localStorage.getItem(REFRESH_TOKEN_KEY) ?? sessionStorage.getItem(REFRESH_TOKEN_KEY)
}

// `remember` picks the storage: localStorage survives browser restarts ("Yadda saxla"
// checked), sessionStorage clears when the tab/browser closes (unchecked). When `remember`
// is omitted (e.g. the httpClient refresh interceptor rewriting tokens after a 401), we
// keep using whichever storage already holds a token instead of defaulting back to
// localStorage — otherwise a silent token refresh would upgrade a "don't remember" session
// into a persistent one.
export function setTokens(accessToken: string, refreshToken: string, remember?: boolean) {
  if (!isBrowser()) return
  const useLocal = remember ?? sessionStorage.getItem(ACCESS_TOKEN_KEY) === null
  const storage = useLocal ? localStorage : sessionStorage
  const other = useLocal ? sessionStorage : localStorage
  storage.setItem(ACCESS_TOKEN_KEY, accessToken)
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  other.removeItem(ACCESS_TOKEN_KEY)
  other.removeItem(REFRESH_TOKEN_KEY)
}

export function clearTokens() {
  if (!isBrowser()) return
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}
