'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { BasketSidebarPanel, EmptyStateCard, Loader, ProductDetailContent } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { BASKET_PANEL_HEIGHT, clampToViewport } from '@/shared/utils/viewport'
import { PANEL_HEIGHT } from './constants'
import { FavoritesGrid } from './components/FavoritesGrid'

export function FavoritesPage() {
    const router = useRouter()
    const params = useParams<{ id?: string }>()
    const searchParams = useSearchParams()
    const selectedProductId = params.id ? Number(params.id) : null
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)

    const { data: favorites, isLoading } = useFavorites()

    if (isLoading) return <Loader />

    return (
        <Container className="-mt-[20px] py-6">
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
                            products={favorites}
                            currentPage={currentPage}
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
