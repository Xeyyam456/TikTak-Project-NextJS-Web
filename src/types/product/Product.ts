import type { Category } from '../category'
import type { ProductMeasure } from './ProductMeasure'

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
