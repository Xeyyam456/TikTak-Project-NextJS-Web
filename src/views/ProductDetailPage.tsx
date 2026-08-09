'use client'

import { useEffect, useState } from 'react'
import { Loader } from '@/components'
import { Container } from '@/components/layout/Container'
import type { Product } from '@/models'
import { productService } from '@/services'

interface ProductDetailPageProps {
  productId: number
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService
      .getById(productId)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) return <Loader />
  if (!product)
    return (
      <Container className="py-6">
        <p>Mehsul tapilmadi.</p>
      </Container>
    )

  return (
    <Container className="py-6">
      <div className="aspect-video w-full rounded-lg bg-neutral-100" />
      <h1 className="mt-4 text-xl font-semibold">{product.title}</h1>
      <p className="mt-1 text-neutral-500">{product.description}</p>
      <p className="mt-2 text-lg font-medium">
        {product.price} AZN / {product.type}
      </p>
    </Container>
  )
}
