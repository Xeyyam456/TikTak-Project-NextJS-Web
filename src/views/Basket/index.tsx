'use client'

import { useState } from 'react'
import { Button, ConfirmModal, Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { BasketPageItemRow } from './components/BasketPageItemRow'
import { BasketTotalCard } from './components/BasketTotalCard'

export function BasketPage() {
    const { data: basket, isLoading } = useBasket()
    const { add, remove, removeAll, clear } = useBasketMutations()
    const [pendingRemove, setPendingRemove] = useState<{ id: number; title: string } | null>(null)

    const handleConfirmRemove = () => {
        if (!pendingRemove) return
        removeAll.mutate(pendingRemove.id)
        setPendingRemove(null)
    }

    if (isLoading) return <Loader />

    return (
        <Container className="py-6">
            {!basket || basket.items.length === 0 ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-12 text-center shadow-sm">
                    <p className="text-lg font-semibold text-neutral-900">Səbətiniz boşdur</p>
                    <p className="mt-2 text-sm text-neutral-500">Sifariş vermək üçün səbətinizə məhsul əlavə edin</p>
                </div>
            ) : (
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <h1 className="text-xl font-semibold text-neutral-900">Səbətim</h1>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => clear.mutate()}
                                className="text-sm text-neutral-400 hover:text-neutral-600"
                            >
                                Səbəti təmizlə
                            </Button>
                        </div>

                        <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                            <div className="scrollbar-hide max-h-[calc(56vh+10px)] overflow-y-auto">
                                {[...basket.items]
                                    .sort((a, b) => a.id - b.id)
                                    .map((item) => (
                                        <BasketPageItemRow
                                            key={item.id}
                                            item={item}
                                            onIncrease={() => add.mutate(item.product.id)}
                                            onDecreaseOrRemove={() =>
                                                item.quantity > 1
                                                    ? remove.mutate(item.product.id)
                                                    : setPendingRemove({ id: item.product.id, title: item.product.title })
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    <BasketTotalCard total={basket.total} />
                </div>
            )}

            <ConfirmModal
                open={!!pendingRemove}
                title="Məhsulu səbətdən silmək istəyirsiniz?"
                description={pendingRemove?.title}
                onConfirm={handleConfirmRemove}
                onCancel={() => setPendingRemove(null)}
            />
        </Container>
    )
}
