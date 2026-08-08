import { BasketPage } from '@/views'
import { RequireAuth } from '@/components/auth/RequireAuth'

export default function Page() {
  return (
    <RequireAuth>
      <BasketPage />
    </RequireAuth>
  )
}
