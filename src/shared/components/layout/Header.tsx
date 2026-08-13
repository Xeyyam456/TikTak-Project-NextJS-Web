'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Container } from './Container'
import { useBasket } from '@/shared/hooks/useBasket'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useProducts } from '@/shared/hooks/useProducts'
import { useProfile } from '@/shared/hooks/useProfile'
import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'

function LocationIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
            <path d="M12 21s-7-6.5-7-11.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21Z" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="2.5" />
        </svg>
    )
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-[18px] w-[18px]">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
    )
}

function UserIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-[15px] w-[15px]">
            <path
                d="M2.19668 9.69668C3.01357 8.87982 3.98587 8.27511 5.04671 7.90904C3.91052 7.12649 3.16406 5.81684 3.16406 4.33594C3.16406 1.94511 5.10917 0 7.5 0C9.89083 0 11.8359 1.94511 11.8359 4.33594C11.8359 5.81684 11.0895 7.12649 9.95326 7.90904C11.0141 8.27511 11.9864 8.87982 12.8033 9.69668C14.2199 11.1133 15 12.9967 15 15H13.8281C13.8281 11.5107 10.9893 8.67188 7.5 8.67188C4.01065 8.67188 1.17188 11.5107 1.17188 15H0C0 12.9967 0.780147 11.1133 2.19668 9.69668ZM7.5 7.5C9.24466 7.5 10.6641 6.08063 10.6641 4.33594C10.6641 2.59125 9.24466 1.17188 7.5 1.17188C5.75534 1.17188 4.33594 2.59125 4.33594 4.33594C4.33594 6.08063 5.75534 7.5 7.5 7.5Z"
                fill="currentColor"
            />
        </svg >
    )
}

function HeartIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="h-[17px] w-[17px]">
            <g clipPath="url(#clip0_10_8604)">
                <path
                    d="M15.6269 2.41488C14.7367 1.52469 13.5582 1.03816 12.3004 1.03816C11.0426 1.03816 9.86051 1.5283 8.97032 2.41848L8.50541 2.88339L8.03329 2.41127C7.14311 1.52109 5.9574 1.02734 4.69961 1.02734C3.44542 1.02734 2.26332 1.51748 1.37674 2.40406C0.486557 3.29425 -0.00358424 4.47635 1.97344e-05 5.73414C1.97344e-05 6.99193 0.493765 8.17043 1.38395 9.06061L8.15222 15.8289C8.24592 15.9226 8.37206 15.973 8.4946 15.973C8.61713 15.973 8.74327 15.9262 8.83698 15.8325L15.6197 9.07503C16.5098 8.18484 17 7.00274 17 5.74495C17.0036 4.48716 16.5171 3.30506 15.6269 2.41488ZM14.9349 8.38667L8.4946 14.8017L2.0687 8.37585C1.36232 7.66948 0.973094 6.73244 0.973094 5.73414C0.973094 4.73584 1.35872 3.7988 2.0651 3.09603C2.76788 2.39325 3.70491 2.00402 4.69961 2.00402C5.69791 2.00402 6.63855 2.39325 7.34493 3.09963L8.15943 3.91413C8.35044 4.10514 8.65678 4.10514 8.84779 3.91413L9.65508 3.10684C10.3615 2.40046 11.3021 2.01123 12.2968 2.01123C13.2915 2.01123 14.2285 2.40046 14.9349 3.10324C15.6413 3.80961 16.0269 4.74665 16.0269 5.74495C16.0305 6.74325 15.6413 7.68029 14.9349 8.38667Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_10_8604">
                    <rect width="17" height="17" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

function BasketIcon() {
    return (
        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" className="h-[17px] w-[19px]">
            <path
                d="M6.36035 13.3555C7.25233 13.3556 7.97562 14.0787 7.97559 14.9707C7.97547 15.8626 7.25226 16.5858 6.36035 16.5859C5.46838 16.5859 4.74523 15.8627 4.74512 14.9707C4.74512 14.0787 5.46827 13.3555 6.36035 13.3555ZM6.36035 14.1514C5.90772 14.1514 5.54102 14.5181 5.54102 14.9707C5.54111 15.4233 5.90777 15.79 6.36035 15.79C6.81283 15.7899 7.17962 15.4232 7.17969 14.9707C7.17969 14.5181 6.81289 14.1515 6.36035 14.1514Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.1"
            />
            <path
                d="M14.1865 13.3555C15.0785 13.3556 15.8018 14.0787 15.8018 14.9707C15.8016 15.8626 15.0784 16.5858 14.1865 16.5859C13.2945 16.5859 12.5714 15.8627 12.5713 14.9707C12.5713 14.0787 13.2944 13.3555 14.1865 13.3555ZM14.1865 14.1514C13.7339 14.1514 13.3672 14.5181 13.3672 14.9707C13.3673 15.4233 13.7339 15.79 14.1865 15.79C14.639 15.7899 15.0058 15.4232 15.0059 14.9707C15.0059 14.5181 14.6391 14.1515 14.1865 14.1514Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.1"
            />
            <path
                d="M1.91699 0.0498047C2.69562 0.0575287 3.39332 0.487428 3.70215 1.1416L3.75879 1.27539V1.27637L4.12207 2.30078L17.6807 2.47461H17.6846L17.7871 2.49316C17.8536 2.51088 17.9161 2.53955 17.9717 2.57812L18.0498 2.64355L18.0508 2.64453C18.1457 2.7469 18.173 2.8884 18.124 3.0166L18.126 3.01758L17.123 6.88574C16.8936 7.77926 16.0808 8.44002 15.0967 8.54004H15.0957L6.33301 9.38379L6.17969 9.70117C6.06445 9.99182 6.10114 10.316 6.2793 10.5791C6.45906 10.8448 6.77337 11.0106 7.11621 11.0186H15.2373C15.4916 11.0186 15.7051 11.2102 15.7051 11.4541C15.7049 11.6979 15.4916 11.8887 15.2373 11.8887H7.11426C6.46582 11.8707 5.86599 11.562 5.50879 11.0596C5.14818 10.5479 5.07576 9.90656 5.31543 9.33691L5.31641 9.33496L5.51562 8.91113L2.87109 1.56055L2.80762 1.42578C2.63469 1.12546 2.29611 0.926705 1.91504 0.918945H0.517578C0.263242 0.918945 0.0498047 0.728326 0.0498047 0.484375C0.0498773 0.240484 0.263286 0.0498047 0.517578 0.0498047H1.91699ZM6.33398 8.49414L14.9824 7.6709H14.9834C15.5855 7.62686 16.082 7.22597 16.2119 6.68848V6.6875L17.0938 3.34277L4.42969 3.1709L6.33398 8.49414Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.1"
            />
        </svg>
    )
}

export function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const isLanding = pathname === '/'
    const { data: profile } = useProfile()
    const { data: basket } = useBasket()
    const basketCount = basket?.count ?? 0
    const { data: favorites } = useFavorites()
    const favoritesCount = favorites?.length ?? 0
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

    const trimmedQuery = query.trim().toLowerCase()
    const searchResults = trimmedQuery
        ? (products ?? []).filter(
              (product) =>
                  product.title.toLowerCase().includes(trimmedQuery) ||
                  product.description?.toLowerCase().includes(trimmedQuery),
          )
        : []

    const handleSelectProduct = (productId: number) => {
        router.push(`/products/${productId}`)
        setQuery('')
        setIsSearchOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 bg-white">
            <Container className="flex items-center justify-between gap-6 pt-[30px] pb-[30px]">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center text-[40px] font-extrabold leading-none tracking-[0.03em] text-neutral-900"
                    >
                        TIK TAK
                    </Link>

                    {!isLanding && (
                        <div className="flex items-center gap-[8px] rounded-[8px] border border-neutral-100 bg-neutral-50 px-3 py-1.5">
                            <LocationIcon className="h-8 w-8 flex-shrink-0" />
                            <div className="flex flex-col justify-center gap-[2px]">
                                <span className="text-[12px] font-medium leading-none text-neutral-400">Ünvan</span>
                                <span className="text-[14px] leading-none text-neutral-500">{profile?.address ?? 'Ünvanınızı seçin'}</span>
                            </div>
                        </div>
                    )}
                </div>

                {!isLanding && (
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
                        />
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                            <SearchIcon />
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
                )}

                <nav className="flex items-center gap-6 text-[14px] font-normal leading-none tracking-normal text-foreground">
                    <Link
                        href="/account"
                        className={`flex items-center gap-[10px] hover:text-[#0A955E] ${
                            pathname === '/account' ? 'font-semibold text-[#0A955E]' : ''
                        }`}
                    >
                        {profile?.img_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={profile.img_url} alt="" className="h-[30px] w-[30px] rounded-full object-cover" />
                        ) : (
                            <UserIcon />
                        )}
                        Hesabım
                    </Link>
                    <Link
                        href="/favorites"
                        className={`relative flex items-center gap-[10px] hover:text-[#0A955E] ${
                            pathname === '/favorites' ? 'font-semibold text-[#0A955E]' : ''
                        }`}
                    >
                        <span className="relative">
                            <HeartIcon />
                            {favoritesCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#92D871] px-1 text-[10px] font-semibold leading-none text-white">
                                    {favoritesCount}
                                </span>
                            )}
                        </span>
                        Siyahılarım
                    </Link>
                    <Link
                        href="/basket"
                        className={`relative flex items-center gap-[10px] hover:text-[#0A955E] ${
                            pathname === '/basket' ? 'font-semibold text-[#0A955E]' : ''
                        }`}
                    >
                        <span className="relative">
                            <BasketIcon />
                            {basketCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#92D871] px-1 text-[10px] font-semibold leading-none text-white">
                                    {basketCount}
                                </span>
                            )}
                        </span>
                        Səbətim
                    </Link>
                </nav>
            </Container>

            {!isLanding && <div className="h-3 w-full border-t border-neutral-100 bg-neutral-50" />}
        </header>
    )
}
