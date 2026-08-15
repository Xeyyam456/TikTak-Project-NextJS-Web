import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'
import type { OrderItemsListProps } from '@/types'

export function OrderItemsList({ items, total }: OrderItemsListProps) {
    return (
        <>
            <h3 className="mb-4 mt-10 flex-shrink-0 text-base font-semibold text-neutral-900">Məhsullar</h3>

            <div className="scrollbar-hide max-h-[186px] min-h-0 flex-1 overflow-y-auto">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 border-b border-neutral-100 py-2.5 last:border-b-0"
                    >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.product.img_url || PRODUCT_IMAGE_FALLBACK}
                                alt={item.product.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <p className="min-w-0 flex-1 truncate text-xs text-neutral-700">
                            {item.product.title} {item.quantity}
                            {item.product.type}
                        </p>
                        <p className="w-16 flex-shrink-0 text-center text-xs text-neutral-500">{item.quantity}</p>
                        <p className="flex-shrink-0 text-xs text-neutral-500">{item.total_price} AZN</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex flex-shrink-0 items-center justify-between text-base font-bold text-neutral-900">
                <span>Yekun məbləğ:</span>
                <span>{total} AZN</span>
            </div>
        </>
    )
}
