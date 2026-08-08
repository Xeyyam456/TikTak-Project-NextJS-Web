import { RegisterPage } from '@/views'
import { RedirectIfAuth } from '@/components/auth/RedirectIfAuth'

export default function Page() {
  return (
    <RedirectIfAuth>
      <RegisterPage />
    </RedirectIfAuth>
  )
}
