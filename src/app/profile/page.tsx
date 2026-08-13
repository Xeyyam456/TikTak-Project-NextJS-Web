import type { Metadata } from 'next'
import { ProfilePage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Profilim',
  description: 'TIK TAK profil məlumatlarınızı görüntüləyin.',
  path: '/profile',
})

export default function Page() {
  return (
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  )
}
