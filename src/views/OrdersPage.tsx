'use client'

import { useEffect, useState } from 'react'
import { Loader } from '@/shared/components'
import type { Order } from '@/types'
import { orderService } from '@/services'

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService
      .list()
      .then((data) => setOrders(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <h2 className="mb-6 text-lg font-semibold text-neutral-900">Sifarişlərim</h2>

      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p className="text-sm text-neutral-500">Sifarişiniz yoxdur.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-[8px] border border-neutral-200 p-3">
              <p className="font-medium text-neutral-900">{order.orderNumber}</p>
              <p className="text-sm text-neutral-500">
                {order.status} · {order.total} AZN
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
