'use client'

import { useEffect, useState } from 'react'
import { Loader, ProductCard } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import type { Product } from '@/types'
import { productService } from '@/services'

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService
      .list()
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

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
