import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components'
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

            <div className="flex h-11 items-center gap-3 rounded-[8px] bg-mint-pale px-2">
                <Button
                    type="button"
                    variant="danger"
                    onClick={onDecreaseOrRemove}
                    className="flex h-8 w-8 items-center justify-center"
                >
                    {item.quantity > 1 ? <Minus size={16} /> : <Trash2 size={16} />}
                </Button>
                <span className="min-w-[1ch] text-base font-semibold text-white">{item.quantity}</span>
                <Button
                    type="button"
                    onClick={onIncrease}
                    className="flex h-8 w-8 items-center justify-center"
                >
                    <Plus size={16} />
                </Button>
            </div>
        </div>
    )
}
