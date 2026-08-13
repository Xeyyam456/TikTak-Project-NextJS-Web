'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Loader, Pagination } from '@/shared/components'
import { useOrders } from '@/shared/hooks/useOrders'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '@/shared/utils/orderStatus'
import { getTotalPages, paginate } from '@/shared/utils/pagination'

const PAGE_SIZE = 7

function formatDate(iso: string) {
  const date = new Date(iso)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}.${date.getFullYear()}`
}

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
          <div className="overflow-hidden rounded-[8px] border border-neutral-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#0A955E] text-white">
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">No</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">Tarix</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">Çatdırılma ünvanı</th>
                    <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">Məhsul sayı</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">Subtotal/Çatdırılma</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">Status</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold" />
                  </tr>
                </thead>
                <tbody>
                  {pagedOrders.map((order, index) => {
                    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
                    const deliveryLabel = Number(order.deliveryFee) === 0 ? 'pulsuz' : `${order.deliveryFee} AZN`

                    return (
                      <tr
                        key={order.id}
                        className={`border-b border-neutral-100 last:border-b-0 ${index % 2 === 1 ? 'bg-neutral-50' : ''}`}
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-neutral-900">{order.orderNumber}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-neutral-500">{formatDate(order.createdAt)}</td>
                        <td className="max-w-[220px] truncate px-4 py-3 text-neutral-500" title={order.address}>
                          {order.address}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center text-neutral-500">{itemCount}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                          {order.total} AZN/{deliveryLabel}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-3 font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          <Link
                            href={`/account/orders/${order.id}`}
                            className="inline-flex items-center gap-0.5 text-neutral-500 hover:text-neutral-900"
                          >
                            detallar
                            <ChevronRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

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
