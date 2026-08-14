import type { ReactNode } from 'react'
import type { Category } from './Category'

export interface CategoryDetailLayoutProps {
  children: ReactNode
  categories: Category[]
}
