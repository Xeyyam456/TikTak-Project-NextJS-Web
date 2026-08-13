import { StatCard } from './StatCard'

const stats = {
    market_count: 137,
    region_count: 11,
    product_count: 500000,
    employee_count: 5500,
}

function StoreIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
            <path d="M3 9.5 4.3 4h15.4l1.3 5.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M3 9.5a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0 4.4 0"
                strokeLinecap="round"
            />
            <path d="M4.5 9.8V20h15V9.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.7 20v-4.2a2.3 2.3 0 0 1 4.6 0V20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function MapPinIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
            <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" strokeLinejoin="round" />
            <path d="M9 4v14M15 6v14" />
        </svg>
    )
}

function BoxIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
            <path d="M12 3 20 7v10l-8 4-8-4V7Z" strokeLinejoin="round" />
            <path d="M12 3v18M4 7l8 4 8-4" strokeLinejoin="round" />
        </svg>
    )
}

function UsersIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
            <circle cx="9" cy="8" r="3" />
            <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
            <circle cx="17" cy="8.5" r="2.3" />
            <path d="M15.5 14.2c2.7.4 4.7 2.6 5.5 5.8" strokeLinecap="round" />
        </svg>
    )
}

export function StatsSection() {
    const items = [
        { value: `${stats.market_count}`, label: 'Market sayı', icon: <StoreIcon /> },
        { value: `${stats.region_count}`, label: 'Region', icon: <MapPinIcon /> },
        { value: `${stats.product_count}+`, label: 'Məhsul sayı', icon: <BoxIcon /> },
        { value: `${stats.employee_count}+`, label: 'Əməkdaş sayı', icon: <UsersIcon /> },
    ]

    return (
        <section className="rounded-2xl bg-white p-8">
            <h2 className="text-2xl font-bold text-primary">Bizim göstəricilər</h2>
            <p className="mt-1 text-sm text-primary">
                Biz yeni imkanlar axtarırıq və digərlərinin bilmədikləri yerlərə getməyə hazırıq.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((item) => (
                    <StatCard key={item.label} {...item} />
                ))}
            </div>
        </section>
    )
}
