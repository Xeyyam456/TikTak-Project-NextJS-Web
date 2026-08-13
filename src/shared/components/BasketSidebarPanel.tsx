'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { ConfirmModal } from './ui/ConfirmModal'
import type { BasketSidebarPanelProps } from '@/types'
import basketEmpty from '@/assets/images/basket-empty.svg'

export function BasketSidebarPanel({ height, headingOffset = -32 }: BasketSidebarPanelProps) {
    const { data: basket } = useBasket()
    const { add, remove, removeAll } = useBasketMutations()
    const [pendingRemove, setPendingRemove] = useState<{ id: number; title: string } | null>(null)

    const handleConfirmRemove = () => {
        if (!pendingRemove) return
        removeAll.mutate(pendingRemove.id)
        setPendingRemove(null)
    }

    return (
        <div className="relative w-[320px] flex-shrink-0">
            <h2 style={{ top: headingOffset }} className="absolute left-0 text-lg font-semibold text-neutral-900">
                Səbətim
            </h2>
            <div style={{ height }} className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                {!basket || basket.items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={basketEmpty.src} alt="" className="h-[300px] w-auto" />
                        <p className="mt-5 text-xl font-bold text-[#0A955E]">Səbətiniz boşdur</p>
                        <p className="mt-2 text-sm text-neutral-500">Sifariş vermək üçün səbətinizə məhsul əlavə edin</p>
                    </div>
                ) : (
                    <>
                        <div className="scrollbar-hide flex-1 space-y-[10px] overflow-y-auto">
                            {[...basket.items]
                                .sort((a, b) => a.id - b.id)
                                .map((item) => (
                                    <div key={item.id} className="relative rounded-2xl bg-neutral-100 p-3">
                                        <button
                                            type="button"
                                            onClick={() => setPendingRemove({ id: item.product.id, title: item.product.title })}
                                            className="absolute right-2 top-2 cursor-pointer text-red-400 transition-colors hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                        <div className="flex gap-3">
                                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white">
                                                {item.product.img_url && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={item.product.img_url}
                                                        alt={item.product.title}
                                                        className="max-h-full max-w-full object-contain"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                                                <p className="truncate pr-5 text-sm font-semibold text-neutral-900">
                                                    {item.product.title}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex h-8 items-center gap-1.5 rounded-[8px] bg-[#C0E8AD] px-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => remove.mutate(item.product.id)}
                                                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[8px] bg-[#F4A6A6] text-white transition-colors hover:bg-[#EF8A8A]"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="min-w-[1ch] text-sm font-semibold text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => add.mutate(item.product.id)}
                                                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[8px] bg-[#92D871] text-white transition-colors hover:bg-[#7CB760]"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm font-bold text-neutral-900">{item.product.price} AZN</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="mt-3 flex-shrink-0 space-y-2 border-t border-neutral-100 pt-3">
                            <div className="flex items-center justify-between text-sm text-neutral-500">
                                <span>Ümumi:</span>
                                <span className="text-neutral-900">{basket.total} AZN</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-neutral-500">
                                <span>Çatdırılma:</span>
                                <span className="text-neutral-900">Pulsuz</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-neutral-100 pt-2 text-sm font-bold text-neutral-900">
                                <span>Yekun məbləğ:</span>
                                <span>{basket.total} AZN</span>
                            </div>
                            <Link
                                href="/basket"
                                className="mt-1 block w-full cursor-pointer rounded-[8px] bg-[#2B3043] py-3 text-center text-base font-semibold text-white transition-colors hover:bg-[#1F2333]"
                            >
                                Sifarişi tamamla
                            </Link>
                        </div>
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
