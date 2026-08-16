import type { EmptyStateCardProps } from '@/types'

export function EmptyStateCard({ height, title, subtitle }: EmptyStateCardProps) {
    return (
        <div
            style={{ height }}
            className="flex flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-12 text-center shadow-sm"
        >
            <p className="text-lg font-semibold text-neutral-900">{title}</p>
            <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        </div>
    )
}
