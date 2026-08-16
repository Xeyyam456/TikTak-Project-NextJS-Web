'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { BasketSidebarPanel } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import type { CategoryDetailLayoutProps } from '@/types'
import categoryBanner from '@/assets/images/category.png'

export function CategoryDetailLayout({ children, categories }: CategoryDetailLayoutProps) {
    const pathname = usePathname()
    const params = useParams<{ id?: string }>()
    const isIndex = pathname === '/categories'
    const categoryId = Number(params.id)

    if (isIndex) return <>{children}</>

    const activeCategory = categories.find((category) => category.id === categoryId)

    // The row is `items-stretch`, and the sidebar is the ONLY in-flow height source:
    // the product grid and basket both live in `relative` wrappers whose real content is
    // `absolute inset-0`, so they contribute no height of their own and can never inflate
    // (or shrink) the row. They simply stretch to whatever the sidebar measures. This is
    // pure CSS — no ResizeObserver, no first-paint jump, and a full basket can't push the
    // layout taller because its scroll area is absolutely positioned inside a fixed box.
    return (
        <Container className="py-2">
            <p className="mb-12 text-sm text-neutral-500">
                <Link href="/" className="hover:text-neutral-700">
                    Ana səhifə
                </Link>{' '}
                / {activeCategory?.name ?? 'Kateqoriya'}
            </p>

            <div className="flex items-stretch gap-4">
                <div className="relative w-[280px] flex-shrink-0">
                    <h2 className="absolute -top-8 left-0 text-xl font-semibold text-neutral-900">Kateqoriyalar</h2>
                    <div className="overflow-hidden">
                        <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                            <ul>
                                {categories.map((category) => {
                                    const isActive = category.id === categoryId
                                    return (
                                        <li key={category.id}>
                                            <Link
                                                href={`/categories/${category.id}`}
                                                className={
                                                    isActive
                                                        ? 'block px-2 py-2 text-sm font-semibold text-emerald'
                                                        : 'block px-2 py-2 text-sm text-neutral-500 hover:text-neutral-700'
                                                }
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="relative mt-[16px] h-[318px] w-full max-w-full overflow-hidden rounded-2xl">
                            <Image src={categoryBanner} alt="" fill sizes="280px" className="object-cover" />
                        </div>
                    </div>
                </div>

                <div className="relative flex-1">
                    <div className="absolute inset-0">{children}</div>
                </div>

                <BasketSidebarPanel fill />
            </div>
        </Container>
    )
}
