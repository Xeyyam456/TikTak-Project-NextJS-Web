import { OrdersPage } from '@/views'
import { RequireAuth } from '@/components/auth/RequireAuth'

export default function Page() {
  return (
    <RequireAuth>
      <OrdersPage />
    </RequireAuth>
  )
}
