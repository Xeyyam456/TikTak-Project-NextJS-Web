import type { Metadata } from 'next'
import { ProfilePage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export const metadata: Metadata = {
  title: 'Profilim',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  )
}
