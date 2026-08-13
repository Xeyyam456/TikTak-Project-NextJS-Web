'use client'

import { ProductDetailContent } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import type { ProductDetailPageProps } from '@/types'

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  return (
    <Container className="py-10">
      <ProductDetailContent productId={productId} className="min-h-[600px] p-10" />
    </Container>
  )
}
