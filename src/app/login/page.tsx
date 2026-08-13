import type { Metadata } from 'next'
import { LoginPage } from '@/views'
import { RedirectIfAuth } from '@/shared/components/auth/RedirectIfAuth'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Daxil ol',
  description: 'TIK TAK hesabınıza daxil olun.',
  path: '/login',
})

export default function Page() {
  return (
    <RedirectIfAuth>
      <LoginPage />
    </RedirectIfAuth>
  )
}
