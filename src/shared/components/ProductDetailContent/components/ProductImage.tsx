import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'
import type { ProductImageProps } from '@/types'

export function ProductImage({ imgUrl, title }: ProductImageProps) {
    return (
        <div className="flex flex-1 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imgUrl || PRODUCT_IMAGE_FALLBACK}
                alt={title}
                className="max-h-[300px] max-w-full w-auto object-contain"
            />
        </div>
    )
}
