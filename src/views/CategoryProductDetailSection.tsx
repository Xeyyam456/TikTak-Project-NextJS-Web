'use client'

import { ProductDetailContent } from '@/shared/components'
import type { CategoryProductDetailSectionProps } from '@/types'
import { useCategorySidebarHeight } from './CategoryDetailLayout'

export function CategoryProductDetailSection({ productId }: CategoryProductDetailSectionProps) {
    const sidebarHeight = useCategorySidebarHeight()

    return (
        <ProductDetailContent
            productId={productId}
            height={sidebarHeight}
            className="scrollbar-hide flex-1 overflow-y-auto border border-neutral-100 p-6"
        />
    )
}
