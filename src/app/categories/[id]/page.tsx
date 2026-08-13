import type { Metadata } from 'next'
import { CategoryProductsSection } from '@/views'
import { categoryService } from '@/services'
import type { CategoryPageParams } from '@/types'
import { buildMetadata } from '@/shared/utils/seo'

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const { id } = await params
  const path = `/categories/${id}`
  try {
    const { data: categories } = await categoryService.list()
    const category = categories.find((c) => c.id === Number(id))
    return buildMetadata({
      title: category?.name ?? 'Kateqoriyalar',
      description: category?.description || 'TIK TAK-da bu kateqoriyadakı məhsulları kəşf edin.',
      path,
    })
  } catch {
    return buildMetadata({ title: 'Kateqoriyalar', description: 'TIK TAK-da kateqoriyadakı məhsulları kəşf edin.', path })
  }
}

export default async function Page({ params }: CategoryPageParams) {
  const { id } = await params
  return <CategoryProductsSection categoryId={Number(id)} />
}
