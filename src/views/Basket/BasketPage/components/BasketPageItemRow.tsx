import { Minus, Plus, Trash2 } from 'lucide-react'
import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'
import type { BasketPageItemRowProps } from '@/types'

export function BasketPageItemRow({ item, onIncrease, onDecreaseOrRemove }: BasketPageItemRowProps) {
    return (
        <div className="flex h-28 items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.product.img_url || PRODUCT_IMAGE_FALLBACK}
                        alt={item.product.title}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
                <div>
                    <p className="font-semibold text-neutral-900">{item.product.title}</p>
                    <p className="mt-1 text-sm text-neutral-500">{item.product.price} AZN</p>
                </div>
            </div>

            <div className="flex h-11 items-center gap-3 rounded-[8px] bg-[#C0E8AD] px-2">
                <button
                    type="button"
                    onClick={onDecreaseOrRemove}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#F4A6A6] text-white transition-colors hover:bg-[#EF8A8A]"
                >
                    {item.quantity > 1 ? <Minus size={16} /> : <Trash2 size={16} />}
                </button>
                <span className="min-w-[1ch] text-base font-semibold text-white">{item.quantity}</span>
                <button
                    type="button"
                    onClick={onIncrease}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#92D871] text-white transition-colors hover:bg-[#7CB760]"
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    )
}
