import { Minus, Plus, Trash2 } from 'lucide-react'
import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'
import type { BasketItemRowProps } from '@/types'

export function BasketItemRow({ item, onRemoveClick, onIncrease, onDecrease }: BasketItemRowProps) {
    return (
        <div className="relative rounded-2xl bg-neutral-100 p-3">
            <button
                type="button"
                onClick={onRemoveClick}
                className="absolute right-2 top-2 cursor-pointer text-red-400 transition-colors hover:text-red-600"
            >
                <Trash2 size={16} />
            </button>

            <div className="flex gap-3">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.product.img_url || PRODUCT_IMAGE_FALLBACK}
                        alt={item.product.title}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <p className="truncate pr-5 text-sm font-semibold text-neutral-900">{item.product.title}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex h-8 items-center gap-1.5 rounded-[8px] bg-[#C0E8AD] px-1">
                            <button
                                type="button"
                                onClick={onDecrease}
                                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[8px] bg-[#F4A6A6] text-white transition-colors hover:bg-[#EF8A8A]"
                            >
                                <Minus size={12} />
                            </button>
                            <span className="min-w-[1ch] text-sm font-semibold text-white">{item.quantity}</span>
                            <button
                                type="button"
                                onClick={onIncrease}
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
    )
}
