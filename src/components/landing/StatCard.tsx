interface StatCardProps {
    value: string
    label: string
    icon: React.ReactNode
}

export function StatCard({ value, label, icon }: StatCardProps) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4">
            <div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
            <div className="text-primary">{icon}</div>
        </div>
    )
}
