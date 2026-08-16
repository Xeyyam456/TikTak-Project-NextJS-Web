import { Button } from '@/shared/components'
import type { QuantityStepperProps } from '@/types'

export function QuantityStepper({ quantity, type, onIncrease, onDecrease }: QuantityStepperProps) {
    if (quantity === 0) {
        return (
            <Button
                type="button"
                onClick={onIncrease}
                className="flex h-8 w-full items-center justify-center px-2 text-sm font-semibold"
            >
                Səbətə əlavə et
            </Button>
        )
    }

    return (
        <div className="flex w-full items-center gap-1.5">
            <Button
                type="button"
                variant="danger"
                onClick={onDecrease}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-base font-bold"
            >
                −
            </Button>
            <span className="flex h-8 flex-1 items-center justify-center rounded-[8px] bg-mint text-sm font-semibold text-white">
                {quantity} {type}
            </span>
            <Button
                type="button"
                onClick={onIncrease}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-base font-bold"
            >
                +
            </Button>
        </div>
    )
}
