'use client'

import { useEffect, useState } from 'react'
import { Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
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

  if (loading) return <Loader />
  if (orders.length === 0)
    return (
      <Container className="py-6">
        <p>Serencam yoxdur.</p>
      </Container>
    )

  return (
    <Container className="space-y-3 py-6">
      <h1 className="mb-4 text-xl font-semibold">Serencamlarim</h1>
      {orders.map((order) => (
        <div key={order.id} className="rounded-md border border-neutral-200 p-3">
          <p className="font-medium">{order.orderNumber}</p>
          <p className="text-sm text-neutral-500">
            {order.status} · {order.total} AZN
          </p>
        </div>
      ))}
    </Container>
  )
}
