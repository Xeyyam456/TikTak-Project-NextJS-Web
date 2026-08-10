import type { Metadata } from 'next'
import { CategoriesPage } from '@/views'

export const metadata: Metadata = {
  title: 'Kateqoriyalar',
  description: 'TIK TAK-da bütün kateqoriyaları kəşf edin.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CategoriesPage />
}
