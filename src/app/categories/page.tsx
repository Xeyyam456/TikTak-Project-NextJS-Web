import type { Metadata } from 'next'
import { CategoriesPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export const metadata: Metadata = {
  title: 'Kateqoriyalar',
  description: 'TIK TAK-da bütün kateqoriyaları kəşf edin.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <RequireAuth>
      <CategoriesPage />
    </RequireAuth>
  )
}
