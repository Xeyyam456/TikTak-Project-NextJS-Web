'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { BasketSidebarPanel, Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { categoryService } from '@/services'
import type { Category, CategoryDetailLayoutProps } from '@/types'
import categoryBanner from '@/assets/images/category.png'

const SidebarHeightContext = createContext<number | undefined>(undefined)

export function useCategorySidebarHeight() {
    return useContext(SidebarHeightContext)
}

export function CategoryDetailLayout({ children }: CategoryDetailLayoutProps) {
    const pathname = usePathname()
    const params = useParams<{ id?: string }>()
    const isIndex = pathname === '/categories'
    const categoryId = Number(params.id)

    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [sidebarHeight, setSidebarHeight] = useState<number>()
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isIndex) return
        categoryService
            .list()
            .then((res) => setCategories(res.data))
            .catch(() => setCategories([]))
            .finally(() => setLoading(false))
    }, [isIndex])

    useEffect(() => {
        if (!sidebarRef.current) return
        const observer = new ResizeObserver(([entry]) => setSidebarHeight(entry.contentRect.height))
        observer.observe(sidebarRef.current)
        return () => observer.disconnect()
    }, [loading])

    if (isIndex) return <>{children}</>

    if (loading) return <Loader />

    const activeCategory = categories.find((category) => category.id === categoryId)

    return (
        <Container className="py-2">
            <p className="mb-12 text-sm text-neutral-500">
                <Link href="/" className="hover:text-neutral-700">
                    Ana səhifə
                </Link>{' '}
                / {activeCategory?.name ?? 'Kateqoriya'}
            </p>

            <div className="flex items-start gap-4">
                <div className="relative w-[280px] flex-shrink-0">
                    <h2 className="absolute -top-8 left-0 text-xl font-semibold text-neutral-900">Kateqoriyalar</h2>
                    <div ref={sidebarRef} className="overflow-hidden">
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
                                                        ? 'block px-2 py-2 text-sm font-semibold text-[#0A955E]'
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

                <SidebarHeightContext.Provider value={sidebarHeight}>{children}</SidebarHeightContext.Provider>

                <BasketSidebarPanel height={sidebarHeight} />
            </div>
        </Container>
    )
}
