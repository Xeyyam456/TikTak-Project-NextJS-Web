import type { Metadata } from 'next'
import { AccountPage } from '@/views'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Hesabım',
  description: 'TIK TAK hesab məlumatlarınızı idarə edin.',
  path: '/account',
})

export default function Page() {
  return <AccountPage />
}
