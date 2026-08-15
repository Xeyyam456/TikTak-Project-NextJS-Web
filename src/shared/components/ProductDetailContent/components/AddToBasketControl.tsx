import { Check, Trash2 } from 'lucide-react'
import type { AddToBasketControlProps } from '@/types'

export function AddToBasketControl({ quantity, onAdd, onRemove }: AddToBasketControlProps) {
    if (quantity > 0) {
        return (
            <div className="mt-6 flex w-full max-w-xs items-center gap-2">
                <button
                    type="button"
                    onClick={onAdd}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#92D871] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#7CB760]"
                >
                    <Check size={18} />
                    Səbətdədir
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    aria-label="Səbətdən sil"
                    className="flex flex-shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-[#F4A6A6] px-4 py-3.5 text-white transition-colors hover:bg-[#EF8A8A]"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        )
    }

    return (
        <button
            type="button"
            onClick={onAdd}
            className="mt-6 w-full max-w-xs cursor-pointer rounded-[8px] bg-[#92D871] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#7CB760]"
        >
            Səbətə əlavə et
        </button>
    )
}
