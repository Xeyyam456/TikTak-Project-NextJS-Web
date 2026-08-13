import type { Metadata } from 'next'
import { HomePage } from '@/views'
import { buildMetadata } from '@/shared/utils/seo'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'Ana səhifə',
  description:
    'TIK TAK ilə gündəlik ehtiyaclarınızı ən sərfəli qiymətlərlə onlayn sifariş edin — endirimlər, kampaniyalar və sürətli çatdırılma.',
  path: '/',
  robots: { index: true, follow: true },
})

export default function Page() {
  return <HomePage />
}
