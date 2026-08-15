'use client'

import { useState } from 'react'
import { Loader, Pagination } from '@/shared/components'
import { useOrders } from '@/shared/hooks/useOrders'
import { getTotalPages, paginate } from '@/shared/utils/pagination'
import { PAGE_SIZE } from './constants'
import { OrdersTable } from './components/OrdersTable'

export function OrdersPage() {
    const { data: orders, isLoading } = useOrders()
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = getTotalPages(orders?.length ?? 0, PAGE_SIZE)
    const pagedOrders = paginate(orders ?? [], currentPage, PAGE_SIZE)

    return (
        <>
            <h2 className="mb-6 text-lg font-semibold text-neutral-900">Sifariş Tarixçəsi</h2>

            {isLoading ? (
                <Loader />
            ) : !orders || orders.length === 0 ? (
                <p className="text-sm text-neutral-500">Sifarişiniz yoxdur.</p>
            ) : (
                <>
                    <OrdersTable orders={pagedOrders} />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        total={orders.length}
                        pageSize={PAGE_SIZE}
                        className="mt-4"
                    />
                </>
            )}
        </>
    )
}
