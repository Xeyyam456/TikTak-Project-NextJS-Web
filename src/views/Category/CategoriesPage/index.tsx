import Image from 'next/image'
import { CategoryCard } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { serviceGet } from '@/services/serviceAccount'
import type { ApiResponse, Category } from '@/types'
import categoryBanner from '@/assets/images/tiktak-login.webp'

export async function CategoriesPage() {
    const categories: Category[] = await serviceGet<ApiResponse<Category[]>>('/categories')
        .then((res) => res.data)
        .catch(() => [])

    return (
        <Container className="py-6">
            <h1 className="sr-only">Kateqoriyalar</h1>
            <div className="flex items-start gap-4">
                <div className="relative hidden h-[485px] w-[280px] flex-shrink-0 rounded-2xl bg-fern sm:block">
                    <Image
                        src={categoryBanner}
                        alt=""
                        priority
                        className="absolute top-0 left-1/2 z-50 h-[300px] w-auto max-w-none -translate-x-[38%]"
                    />
                    <div
                        className="absolute bottom-[68px] left-6 right-6 z-50 text-center text-white"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                        <p className="whitespace-nowrap text-2xl font-extrabold tracking-[1px]">ONLINE SİFARİŞ ET</p>
                        <div className="mt-2 flex items-end justify-center gap-2">
                            <span className="text-7xl font-extrabold leading-none">15</span>
                            <span className="pb-1 text-left text-2xl font-semibold uppercase leading-tight tracking-[1px]">
                                Dəqiqəyə
                                <br />
                                Qapında
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid flex-1 grid-cols-2 content-start gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </Container>
    )
}
