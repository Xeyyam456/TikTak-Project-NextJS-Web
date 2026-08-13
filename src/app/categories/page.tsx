import type { Metadata } from 'next'
import { CategoriesPage } from '@/views'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Kateqoriyalar',
  description: 'TIK TAK-da bütün kateqoriyaları kəşf edin.',
  path: '/categories',
})

export default function Page() {
  return <CategoriesPage />
}
