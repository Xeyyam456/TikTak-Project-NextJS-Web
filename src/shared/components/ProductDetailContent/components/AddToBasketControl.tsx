import { Check, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components'
import type { AddToBasketControlProps } from '@/types'

export function AddToBasketControl({ quantity, onAdd, onRemove }: AddToBasketControlProps) {
    if (quantity > 0) {
        return (
            <div className="mt-6 flex w-full max-w-xs items-center gap-2">
                <Button
                    type="button"
                    onClick={onAdd}
                    className="flex flex-1 items-center justify-center gap-2 py-3.5 text-base font-semibold"
                >
                    <Check size={18} />
                    Səbətdədir
                </Button>
                <Button
                    type="button"
                    variant="danger"
                    onClick={onRemove}
                    aria-label="Səbətdən sil"
                    className="flex flex-shrink-0 items-center justify-center px-4 py-3.5"
                >
                    <Trash2 size={18} />
                </Button>
            </div>
        )
    }

    return (
        <Button type="button" onClick={onAdd} className="mt-6 w-full max-w-xs py-3.5 text-base font-semibold">
            Səbətə əlavə et
        </Button>
    )
}
