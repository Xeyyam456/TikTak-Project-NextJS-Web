'use client'

import { useEffect, useState } from 'react'
import { Button, Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import type { Basket } from '@/types'
import { basketService } from '@/services'

export function BasketPage() {
  const [basket, setBasket] = useState<Basket | null>(null)
  const [loading, setLoading] = useState(true)

  const loadBasket = () => {
    setLoading(true)
    return basketService
      .list()
      .then((res) => setBasket(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    basketService
      .list()
      .then((res) => setBasket(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />
  if (!basket || basket.items.length === 0)
    return (
      <Container className="py-6">
        <p>Sebet bosdur.</p>
      </Container>
    )

  return (
    <Container className="py-6">
      <h1 className="mb-4 text-xl font-semibold">Sebet</h1>
      <div className="space-y-3">
        {basket.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-md border border-neutral-200 p-3">
            <div>
              <p className="font-medium">{item.product.title}</p>
              <p className="text-sm text-neutral-500">
                {item.quantity} x {item.product.price} AZN
              </p>
            </div>
            <p className="font-medium">{item.total_price} AZN</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-semibold">Cemi: {basket.total} AZN</p>
        <Button onClick={() => basketService.clear().then(loadBasket)}>Sebeti temizle</Button>
      </div>
    </Container>
  )
}
