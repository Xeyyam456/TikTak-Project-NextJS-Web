import type { OrderSummaryCardProps } from '@/types'

export function OrderSummaryCard({ basket, height }: OrderSummaryCardProps) {
    return (
        <div className="flex flex-col">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">Xülasə</h2>
            <div
                style={{ height: height && height - 2 }}
                className="flex min-h-0 flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
            >
                <div className="scrollbar-hide min-h-0 flex-1 space-y-3 overflow-y-auto">
                    {basket?.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-neutral-900">
                                {item.quantity} x {item.product.title}
                            </span>
                            <span className="flex-shrink-0 font-medium text-neutral-900">{item.total_price} AZN</span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex-shrink-0">
                    <div className="border-t border-neutral-100 pt-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500">Ümumi:</span>
                            <span className="text-neutral-900">{basket?.total} AZN</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-neutral-500">Çatdırılma:</span>
                            <span className="text-neutral-900">Pulsuz</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-base font-bold text-neutral-900">
                            <span>Yekun məbləğ</span>
                            <span>{basket?.total} AZN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
