import { CategoryProductCard, Pagination } from '@/shared/components'
import type { FavoritesGridProps } from '@/types'
import { clampToViewport } from '../utils'
import { BASKET_PANEL_HEIGHT, PAGE_SIZE } from '../constants'

export function FavoritesGrid({ products, currentPage, totalPages, total, onSelect, onPageChange }: FavoritesGridProps) {
    return (
        <div style={{ minHeight: clampToViewport(BASKET_PANEL_HEIGHT) }} className="flex flex-col">
            <div className="grid grid-cols-5 gap-x-[15px] gap-y-[24px] px-[10px] pb-[16px] pt-[15px] [&>*]:!mx-0">
                {products.map((product) => (
                    <CategoryProductCard key={product.id} product={product} onSelect={onSelect} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                total={total}
                pageSize={PAGE_SIZE}
                className="mt-auto pb-[10px]"
            />
        </div>
    )
}
