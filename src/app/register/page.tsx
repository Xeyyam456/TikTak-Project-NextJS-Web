import type { Metadata } from 'next'
import { RegisterPage } from '@/views'
import { RedirectIfAuth } from '@/shared/components/auth/RedirectIfAuth'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Qeydiyyat',
  description: 'TIK TAK-da yeni hesab yaradın.',
  path: '/register',
})

export default function Page() {
  return (
    <RedirectIfAuth>
      <RegisterPage />
    </RedirectIfAuth>
  )
}
