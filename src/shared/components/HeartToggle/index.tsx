import { Heart } from 'lucide-react'
import { Button } from '../Button'
import type { HeartToggleProps } from '@/types'

export function HeartToggle({ isFavorite, onToggle, variant }: HeartToggleProps) {
    const label = isFavorite ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'

    if (variant === 'card') {
        return (
            <Button
                type="button"
                variant="ghost"
                onClick={onToggle}
                aria-label={label}
                className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-[8px] backdrop-blur-sm transition-all duration-200 ease-out hover:scale-110 active:scale-90 ${
                    isFavorite
                        ? 'bg-[#F4A6A6]/15 shadow-[0_2px_10px_rgba(244,166,166,0.45)]'
                        : 'bg-white/70 shadow-sm hover:bg-white/90'
                }`}
            >
                <Heart
                    size={17}
                    strokeWidth={2}
                    className={`transition-all duration-200 ${
                        isFavorite ? 'scale-110 fill-[#F4A6A6] text-[#F4A6A6]' : 'text-neutral-400'
                    }`}
                />
            </Button>
        )
    }

    return (
        <Button
            type="button"
            variant="ghost"
            onClick={onToggle}
            aria-label={label}
            className="transition-transform duration-200 hover:scale-110 active:scale-90"
        >
            <Heart
                size={24}
                strokeWidth={2}
                className={isFavorite ? 'fill-[#F4A6A6] text-[#F4A6A6]' : 'text-neutral-700'}
            />
        </Button>
    )
}
