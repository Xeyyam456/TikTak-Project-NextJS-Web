import 'server-only'
import axios from 'axios'
import type { ApiResponse, AuthResponseData, AuthTokens, CachedSession } from '@/types'

// Server-only client for SSR-ing public catalog data (categories/products) that the
// backend otherwise gates behind auth. Deliberately does NOT go through httpClient.ts —
// that client reads/writes the *visitor's* token via localStorage, which doesn't exist
// on the server. This module authenticates as one dedicated account (SERVICE_ACCOUNT_*
// env vars, server-only) and caches its own session in memory, independent of whoever
// is viewing the page.

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

let session: CachedSession | null = null

function decodeExpiryMs(jwt: string): number {
  const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString('utf-8')) as { exp: number }
  return payload.exp * 1000
}

function toSession(tokens: AuthTokens): CachedSession {
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    accessExpiresAt: decodeExpiryMs(tokens.access_token),
  }
}

async function loginServiceAccount(): Promise<CachedSession> {
  const phone = process.env.SERVICE_ACCOUNT_PHONE
  const password = process.env.SERVICE_ACCOUNT_PASSWORD
  if (!phone || !password) {
    throw new Error('SERVICE_ACCOUNT_PHONE / SERVICE_ACCOUNT_PASSWORD env vars are not set')
  }
  const { data } = await axios.post<ApiResponse<AuthResponseData>>(`${BASE_URL}/auth/login`, { phone, password })
  return toSession(data.data.tokens)
}

async function refreshServiceAccount(refreshToken: string): Promise<CachedSession> {
  const { data } = await axios.post<ApiResponse<AuthTokens>>(`${BASE_URL}/auth/refresh`, {
    refresh_token: refreshToken,
  })
  return toSession(data.data)
}

async function getServiceAccessToken(forceRelogin = false): Promise<string> {
  const now = Date.now()

  if (!forceRelogin && session && session.accessExpiresAt - now > 60_000) {
    return session.accessToken
  }

  if (!forceRelogin && session) {
    try {
      session = await refreshServiceAccount(session.refreshToken)
      return session.accessToken
    } catch {
      // refresh_token itself has expired too — fall through to a full re-login below
    }
  }

  session = await loginServiceAccount()
  return session.accessToken
}

export async function serviceGet<T>(path: string): Promise<T> {
  const token = await getServiceAccessToken()

  try {
    const { data } = await axios.get<T>(`${BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}`, 'Accept-Language': 'az' },
    })
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const retryToken = await getServiceAccessToken(true)
      const { data } = await axios.get<T>(`${BASE_URL}${path}`, {
        headers: { Authorization: `Bearer ${retryToken}`, 'Accept-Language': 'az' },
      })
      return data
    }
    throw error
  }
}
