import { Store, MapPin, Package, Users } from 'lucide-react'
import { StatCard } from './StatCard'

const stats = {
    market_count: 137,
    region_count: 11,
    product_count: 500000,
    employee_count: 5500,
}

const ICON_PROPS = { className: 'h-7 w-7', strokeWidth: 1.6 }

export function StatsSection() {
    const items = [
        { value: `${stats.market_count}`, label: 'Market sayı', icon: <Store {...ICON_PROPS} /> },
        { value: `${stats.region_count}`, label: 'Region', icon: <MapPin {...ICON_PROPS} /> },
        { value: `${stats.product_count}+`, label: 'Məhsul sayı', icon: <Package {...ICON_PROPS} /> },
        { value: `${stats.employee_count}+`, label: 'Əməkdaş sayı', icon: <Users {...ICON_PROPS} /> },
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
