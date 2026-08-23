import type { Metadata } from 'next'
import { CategoriesPage } from '@/views'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Kateqoriyalar',
  description: 'TIK TAK-da bütün kateqoriyaları kəşf edin.',
  path: '/categories',
  robots: { index: true, follow: true },
})

export default function Page() {
  return <CategoriesPage />
}
