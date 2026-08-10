import type { ReactNode } from 'react'
import { CategoryDetailLayout } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <CategoryDetailLayout>{children}</CategoryDetailLayout>
    </RequireAuth>
  )
}
