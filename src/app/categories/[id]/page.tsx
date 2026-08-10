import type { Metadata } from 'next'
import { CategoryProductsSection } from '@/views'
import type { CategoryPageParams } from '@/types'

export const metadata: Metadata = {
  title: 'Kateqoriyalar',
  robots: { index: false, follow: false },
}

export default async function Page({ params }: CategoryPageParams) {
  const { id } = await params
  return <CategoryProductsSection categoryId={Number(id)} />
}
