import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../Button'
import type { CarouselNavButtonProps } from '@/types'

export function CarouselNavButton({ direction, onClick }: CarouselNavButtonProps) {
    const isLeft = direction === 'left'

    return (
        <Button
            type="button"
            variant="ghost"
            aria-label={isLeft ? 'Evvelki' : 'Novbeti'}
            onClick={onClick}
            className={`absolute z-20 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-700 shadow ring-1 ring-neutral-200 hover:bg-neutral-50 ${
                isLeft ? 'left-0 -translate-x-[18px]' : 'right-0 translate-x-[18px]'
            }`}
        >
            {isLeft ? (
                <ChevronLeft className="h-7 w-7" strokeWidth={2} />
            ) : (
                <ChevronRight className="h-7 w-7" strokeWidth={2} />
            )}
        </Button>
    )
}
