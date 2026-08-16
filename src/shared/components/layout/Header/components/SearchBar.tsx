'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useProducts } from '@/shared/hooks/useProducts'
import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'

export function SearchBar() {
    const pathname = usePathname()
    const router = useRouter()
    const { data: products } = useProducts()

    const [query, setQuery] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [prevPathname, setPrevPathname] = useState(pathname)
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (pathname !== prevPathname) {
        setPrevPathname(pathname)
        setQuery('')
        setIsSearchOpen(false)
    }

    if (pathname === '/') return null

    const trimmedQuery = query.trim().toLowerCase()
    const searchResults = trimmedQuery
        ? (products ?? []).filter((product) => product.title.toLowerCase().includes(trimmedQuery))
        : []

    const handleSelectProduct = (productId: number) => {
        router.push(`/products/${productId}`)
        setQuery('')
        setIsSearchOpen(false)
    }

    return (
        <div ref={searchRef} className="relative w-full max-w-md flex-1">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setIsSearchOpen(true)
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Axtar..."
                className="header-search-input w-full appearance-none rounded-[8px] border border-neutral-200 py-2 pl-10 pr-4 text-sm focus:border-primary"
                suppressHydrationWarning
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>

            {isSearchOpen && trimmedQuery && (
                <div className="scrollbar-hide absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-neutral-100 bg-white p-2 text-left shadow-lg">
                    {searchResults.length === 0 ? (
                        <p className="px-3 py-4 text-center text-sm text-neutral-400">Nəticə tapılmadı</p>
                    ) : (
                        searchResults.map((product) => (
                            <button
                                key={product.id}
                                type="button"
                                onClick={() => handleSelectProduct(product.id)}
                                className="flex w-full cursor-pointer items-center gap-3 rounded-[8px] px-3 py-2 text-left transition-colors hover:bg-neutral-50"
                            >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-50">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.img_url || PRODUCT_IMAGE_FALLBACK}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-neutral-900">{product.title}</p>
                                    <p className="text-xs text-neutral-500">{product.price} AZN</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
