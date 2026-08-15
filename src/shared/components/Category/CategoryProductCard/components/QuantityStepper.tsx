import type { QuantityStepperProps } from '@/types'

export function QuantityStepper({ quantity, type, onIncrease, onDecrease }: QuantityStepperProps) {
    if (quantity === 0) {
        return (
            <button
                type="button"
                onClick={onIncrease}
                className="flex h-8 w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#92D871] px-2 text-sm font-semibold text-white transition-colors hover:bg-[#7CB760]"
            >
                Səbətə əlavə et
            </button>
        )
    }

    return (
        <div className="flex w-full items-center gap-1.5">
            <button
                type="button"
                onClick={onDecrease}
                className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-[#F4A6A6] text-base font-bold text-white transition-colors hover:bg-[#EF8A8A]"
            >
                −
            </button>
            <span className="flex h-8 flex-1 items-center justify-center rounded-[8px] bg-[#92D871] text-sm font-semibold text-white">
                {quantity} {type}
            </span>
            <button
                type="button"
                onClick={onIncrease}
                className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-[#92D871] text-base font-bold text-white transition-colors hover:bg-[#7CB760]"
            >
                +
            </button>
        </div>
    )
}
