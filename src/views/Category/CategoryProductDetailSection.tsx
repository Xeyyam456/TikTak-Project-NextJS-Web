'use client'

import { ProductDetailContent } from '@/shared/components'
import type { CategoryProductDetailSectionProps } from '@/types'

export function CategoryProductDetailSection({ productId, initialProduct }: CategoryProductDetailSectionProps) {
    // `height="100%"` fills the layout's stretched wrapper (sized to the sidebar via CSS).
    return (
        <ProductDetailContent
            productId={productId}
            initialProduct={initialProduct}
            height="100%"
            className="scrollbar-hide min-h-0 overflow-y-auto border border-neutral-100 p-6"
        />
    )
}
