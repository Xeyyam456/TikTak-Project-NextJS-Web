import Link from 'next/link'
import type { CategoryCardProps } from '@/types'

export function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link
            href={`/categories/${category.id}`}
            className="flex cursor-pointer flex-col items-center rounded-2xl border border-neutral-100 bg-white px-4 py-6 text-center shadow-sm transition-transform duration-200 hover:z-10 hover:scale-105 hover:shadow-lg"
        >
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-neutral-100">
                {category.img_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={category.img_url} alt={category.name} className="h-full w-full object-cover" />
                )}
            </div>
            <p className="mt-3 text-sm font-semibold text-neutral-800">{category.name}</p>
        </Link>
    )
}
