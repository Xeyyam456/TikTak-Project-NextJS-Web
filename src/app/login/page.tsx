import type { Metadata } from 'next'
import { LoginPage } from '@/views'
import { RedirectIfAuth } from '@/shared/components/auth/RedirectIfAuth'

export const metadata: Metadata = {
  title: 'Daxil ol',
  description: 'TIK TAK hesabınıza daxil olun.',
}

export default function Page() {
  return (
    <RedirectIfAuth>
      <LoginPage />
    </RedirectIfAuth>
  )
}
