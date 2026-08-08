'use client'

import { useEffect, useState } from 'react'
import { Loader } from '@/components'
import type { Order } from '@/models'
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

  if (loading) return <Loader />
  if (orders.length === 0) return <p className="p-6">Serencam yoxdur.</p>

  return (
    <div className="space-y-3 p-6">
      <h1 className="mb-4 text-xl font-semibold">Serencamlarim</h1>
      {orders.map((order) => (
        <div key={order.id} className="rounded-md border border-neutral-200 p-3">
          <p className="font-medium">{order.orderNumber}</p>
          <p className="text-sm text-neutral-500">
            {order.status} · {order.total} AZN
          </p>
        </div>
      ))}
    </div>
  )
}
