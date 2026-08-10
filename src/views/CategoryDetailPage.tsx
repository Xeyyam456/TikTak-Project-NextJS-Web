'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CategoryProductCard, Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { categoryService, productService } from '@/services'
import type { Category, CategoryDetailPageProps, Product } from '@/types'
import categoryBanner from '@/assets/images/category.png'

export function CategoryDetailPage({ categoryId }: CategoryDetailPageProps) {
    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([categoryService.list(), productService.list()])
            .then(([categoriesRes, productsRes]) => {
                setCategories(categoriesRes.data)
                setProducts(productsRes.data.filter((product) => product.category.id === categoryId))
            })
            .catch(() => {
                setCategories([])
                setProducts([])
            })
            .finally(() => setLoading(false))
    }, [categoryId])

    if (loading) return <Loader />

    const activeCategory = categories.find((category) => category.id === categoryId)

    return (
        <Container className="py-6">
            <p className="mb-4 text-sm text-neutral-500">
                <Link href="/" className="hover:text-neutral-700">
                    Ana səhifə
                </Link>{' '}
                / {activeCategory?.name ?? 'Kateqoriya'}
            </p>

            <h1 className="mb-4 text-xl font-semibold text-neutral-900">Kateqoriyalar</h1>

            <div className="flex items-start gap-4">
                <div className="w-[280px] flex-shrink-0">
                    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                        <ul>
                            {categories.map((category) => {
                                const isActive = category.id === categoryId
                                return (
                                    <li key={category.id} className={isActive ? 'border-b border-neutral-100 pb-3' : ''}>
                                        <Link
                                            href={`/categories/${category.id}`}
                                            className={
                                                isActive
                                                    ? 'block py-2 text-sm font-semibold text-neutral-900'
                                                    : 'block py-2 text-sm text-neutral-500 hover:text-neutral-700'
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
                        className="mt-4 w-full rounded-2xl object-cover"
                    />
                </div>

                <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <CategoryProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="w-[320px] flex-shrink-0">
                    <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm">
                        <h2 className="mb-4 text-left text-lg font-semibold text-neutral-900">Səbətim</h2>
                        <svg viewBox="0 0 120 100" className="mx-auto h-24 w-28 text-neutral-300">
                            <circle cx="35" cy="30" r="14" fill="currentColor" opacity="0.4" />
                            <rect x="55" y="35" width="45" height="35" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
                            <circle cx="65" cy="80" r="5" fill="none" stroke="currentColor" strokeWidth="3" />
                            <circle cx="90" cy="80" r="5" fill="none" stroke="currentColor" strokeWidth="3" />
                            <path d="M55 42h45" stroke="currentColor" strokeWidth="3" />
                        </svg>
                        <p className="mt-4 font-semibold text-[#92D871]">Səbətiniz boşdur</p>
                        <p className="mt-2 text-sm text-neutral-500">
                            Sifariş vermək üçün səbətinizə məhsul əlavə edin
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}
