import type { StatCardProps } from '@/types'

export function StatCard({ value, label, icon }: StatCardProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white px-6 py-5">
            <p className="text-4xl font-bold text-foreground">{value}</p>
            <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className="text-[#78BC1E]">{icon}</div>
            </div>
        </div>
    )
}
