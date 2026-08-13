import type { Metadata } from 'next'
import { AccountPage } from '@/views'

export const metadata: Metadata = {
  title: 'Hesabım',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AccountPage />
}
