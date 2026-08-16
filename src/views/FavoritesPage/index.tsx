'use client'

import { useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { BasketSidebarPanel, EmptyStateCard, Loader, ProductDetailContent } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { getTotalPages, paginate } from '@/shared/utils/pagination'
import { BASKET_PANEL_HEIGHT, PAGE_SIZE, PANEL_HEIGHT } from './constants'
import { clampToViewport } from './utils'
import { FavoritesGrid } from './components/FavoritesGrid'

export function FavoritesPage() {
    const router = useRouter()
    const params = useParams<{ id?: string }>()
    const searchParams = useSearchParams()
    const selectedProductId = params.id ? Number(params.id) : null
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)

    const { data: favorites, isLoading } = useFavorites()

    const totalPages = getTotalPages(favorites?.length ?? 0, PAGE_SIZE)
    const pagedFavorites = paginate(favorites ?? [], currentPage, PAGE_SIZE)

    useEffect(() => {
        if (!selectedProductId && currentPage > totalPages) {
            router.replace(`/favorites?page=${totalPages}`)
        }
    }, [selectedProductId, currentPage, totalPages, router])

    if (isLoading) return <Loader />

    return (
        <Container className="-mt-[20px] overflow-hidden py-6">
            <h2 className="mb-4 ml-[10px] text-xl font-semibold text-neutral-900">Siyahılarım</h2>

            <div className="mt-[-15px] flex items-start gap-4">
                <div className="flex-1">
                    {selectedProductId ? (
                        <div className="mt-[14px]">
                            <ProductDetailContent
                                productId={selectedProductId}
                                height={clampToViewport(BASKET_PANEL_HEIGHT - 14)}
                                className="p-6"
                                onBack={() => router.push(`/favorites?page=${currentPage}`)}
                            />
                        </div>
                    ) : !favorites || favorites.length === 0 ? (
                        <EmptyStateCard
                            height={clampToViewport(PANEL_HEIGHT)}
                            title="Seçilmişlər boşdur"
                            subtitle="Bəyəndiyiniz məhsulları buraya əlavə edin"
                        />
                    ) : (
                        <FavoritesGrid
                            products={pagedFavorites}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            total={favorites.length}
                            onSelect={(id) => router.push(`/favorites/${id}?page=${currentPage}`)}
                            onPageChange={(page) => router.replace(`/favorites?page=${page}`)}
                        />
                    )}
                </div>

                <div className="mt-[14px]">
                    <BasketSidebarPanel height={clampToViewport(BASKET_PANEL_HEIGHT - 14)} headingOffset={-44} />
                </div>
            </div>
        </Container>
    )
}
