import type { Metadata } from 'next'
import { AccountPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export const metadata: Metadata = {
  title: 'Hesabım',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <RequireAuth>
      <AccountPage />
    </RequireAuth>
  )
}
