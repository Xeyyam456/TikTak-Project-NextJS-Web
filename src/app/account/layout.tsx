import type { ReactNode } from 'react'
import { AccountLayout } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <AccountLayout>{children}</AccountLayout>
    </RequireAuth>
  )
}
