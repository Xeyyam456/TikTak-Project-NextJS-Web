import type { ReactNode } from 'react'
import { CategoryDetailLayout } from '@/views'
import { serviceGet } from '@/services/serviceAccount'
import type { ApiResponse, Category } from '@/types'

export const revalidate = 300

export default async function Layout({ children }: { children: ReactNode }) {
  const categories: Category[] = await serviceGet<ApiResponse<Category[]>>('/categories')
    .then((res) => res.data)
    .catch(() => [])

  return <CategoryDetailLayout categories={categories}>{children}</CategoryDetailLayout>
}
