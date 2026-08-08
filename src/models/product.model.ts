import type { ProductMeasure } from '@/enums'
import type { Category } from './category.model'

export interface Product {
  id: number
  title: string
  img_url: string | null
  description: string
  price: string
  type: ProductMeasure
  created_at: string
  category: Pick<Category, 'id' | 'name'> | Category
  is_favorite?: boolean
}

export interface ProductPayload {
  title: string
  description: string
  price: string
  type: ProductMeasure
  category_id: number
  img_url?: string
}
