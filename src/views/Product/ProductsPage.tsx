import { ProductCard } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import type { PaginatedResponse, Product } from '@/types'
import { serviceGet } from '@/services/serviceAccount'

export async function ProductsPage() {
  const products: Product[] = await serviceGet<PaginatedResponse<Product>>('/products')
    .then((res) => res.data)
    .catch(() => [])

  return (
    <Container className="py-6">
      <h1 className="mb-4 text-xl font-semibold">Mehsullar</h1>
      <div className="grid grid-cols-2 gap-[15px] sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  )
}
