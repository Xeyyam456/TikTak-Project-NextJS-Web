'use client'

import { useState } from 'react'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { useHasMounted } from '@/shared/hooks/useHasMounted'
import { ConfirmModal } from '../ui/ConfirmModal'
import type { BasketSidebarPanelProps } from '@/types'
import { EmptyBasketState } from './components/EmptyBasketState'
import { BasketItemRow } from './components/BasketItemRow'
import { BasketSummary } from './components/BasketSummary'

export function BasketSidebarPanel({ height, headingOffset = -32, fill = false }: BasketSidebarPanelProps) {
    const hasMounted = useHasMounted()
    const { data: basket } = useBasket()
    const { add, remove, removeAll } = useBasketMutations()
    const [pendingRemove, setPendingRemove] = useState<{ id: number; title: string } | null>(null)

    const handleConfirmRemove = () => {
        if (!pendingRemove) return
        removeAll.mutate(pendingRemove.id)
        setPendingRemove(null)
    }

    const isEmpty = !hasMounted || !basket || basket.items.length === 0

    return (
        <div className="relative w-[320px] flex-shrink-0">
            <h2 style={{ top: headingOffset }} className="absolute left-0 text-lg font-semibold text-neutral-900">
                Səbətim
            </h2>
            <div
                style={fill ? undefined : { height }}
                className={`flex flex-col rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm ${
                    fill ? 'absolute inset-0' : ''
                }`}
            >
                {isEmpty ? (
                    <EmptyBasketState />
                ) : (
                    <>
                        <div className="scrollbar-hide min-h-0 flex-1 space-y-[10px] overflow-y-auto">
                            {[...basket.items]
                                .sort((a, b) => a.id - b.id)
                                .map((item) => (
                                    <BasketItemRow
                                        key={item.id}
                                        item={item}
                                        onRemoveClick={() => setPendingRemove({ id: item.product.id, title: item.product.title })}
                                        onIncrease={() => add.mutate(item.product.id)}
                                        onDecrease={() =>
                                            item.quantity > 1
                                                ? remove.mutate(item.product.id)
                                                : removeAll.mutate(item.product.id)
                                        }
                                    />
                                ))}
                        </div>

                        <BasketSummary total={basket.total} />
                    </>
                )}
            </div>

            <ConfirmModal
                open={!!pendingRemove}
                title="Məhsulu səbətdən silmək istəyirsiniz?"
                description={pendingRemove?.title}
                onConfirm={handleConfirmRemove}
                onCancel={() => setPendingRemove(null)}
            />
        </div>
    )
}
