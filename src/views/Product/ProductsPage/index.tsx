import { Container } from '@/shared/components/layout/Container'
import { ProductsGrid } from './ProductsGrid'
import type { PaginatedResponse, Product } from '@/types'
import { serviceGet } from '@/services/serviceAccount'

export async function ProductsPage() {
  const products: Product[] = await serviceGet<PaginatedResponse<Product>>('/products')
    .then((res) => res.data)
    .catch(() => [])

  return (
    <Container className="py-6">
      <h1 className="mb-4 text-xl font-semibold text-neutral-900">Məhsullar</h1>
      <ProductsGrid products={products} />
    </Container>
  )
}
