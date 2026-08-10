'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { Loader } from '@/shared/components'
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
            <p className="mb-4 text-sm text-neutral-500">
                <Link href="/" className="hover:text-neutral-700">
                    Ana səhifə
                </Link>{' '}
                / {activeCategory?.name ?? 'Kateqoriya'}
            </p>

            <h1 className="mb-4 text-xl font-semibold text-neutral-900">Kateqoriyalar</h1>

            <div className="flex items-start gap-4">
                <div ref={sidebarRef} className="w-[280px] flex-shrink-0">
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

                    <img
                        src={categoryBanner.src}
                        alt=""
                        style={{ height: '318px' }}
                        className="mt-[6px] w-full rounded-2xl object-cover"
                    />
                </div>

                <SidebarHeightContext.Provider value={sidebarHeight}>{children}</SidebarHeightContext.Provider>

                <div className="relative w-[320px] flex-shrink-0">
                    <h2 className="absolute -top-8 left-0 text-lg font-semibold text-neutral-900">Səbətim</h2>
                    <div
                        style={{ height: sidebarHeight }}
                        className="flex flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm"
                    >
                        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#EFF9EA]">
                            <svg viewBox="0 0 80 64" className="h-20 w-24 text-[#92D871]">
                                <circle cx="16" cy="8" r="5" fill="currentColor" />
                                <path
                                    d="M16 15v14M16 20l-7 6M16 20l8 5M16 29l-6 12M16 29l7 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx="50" cy="54" r="4" fill="currentColor" />
                                <circle cx="70" cy="54" r="4" fill="currentColor" />
                                <path
                                    d="M24 25h6l5.4 24.4A4 4 0 0 0 39.3 53h30.4a4 4 0 0 0 3.9-3.1L78 30H32"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <p className="mt-5 text-xl font-bold text-[#0A955E]">Səbətiniz boşdur</p>
                        <p className="mt-2 text-sm text-neutral-500">
                            Sifariş vermək üçün səbətinizə məhsul əlavə edin
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}
