import type { Metadata } from 'next'
import { RegisterPage } from '@/views'
import { RedirectIfAuth } from '@/shared/components/auth/RedirectIfAuth'

export const metadata: Metadata = {
  title: 'Qeydiyyat',
  description: 'TIK TAK-da yeni hesab yaradın.',
}

export default function Page() {
  return (
    <RedirectIfAuth>
      <RegisterPage />
    </RedirectIfAuth>
  )
}
