import type { Metadata } from 'next'
import { CategoryDetailPage } from '@/views'
import { categoryService } from '@/services'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import type { CategoryPageParams } from '@/types'

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const { id } = await params
  const robots = { index: false, follow: false }
  try {
    const { data: categories } = await categoryService.list()
    const category = categories.find((item) => item.id === Number(id))
    return {
      title: category?.name ?? 'Kateqoriya',
      description: category?.description || undefined,
      robots,
    }
  } catch {
    return { title: 'Kateqoriya', robots }
  }
}

export default async function Page({ params }: CategoryPageParams) {
  const { id } = await params
  return (
    <RequireAuth>
      <CategoryDetailPage key={id} categoryId={Number(id)} />
    </RequireAuth>
  )
}
