'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { ConfirmModal, Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'

export function BasketPage() {
  const { data: basket, isLoading } = useBasket()
  const { add, remove, removeAll, clear } = useBasketMutations()
  const [pendingRemove, setPendingRemove] = useState<{ id: number; title: string } | null>(null)

  const handleConfirmRemove = () => {
    if (!pendingRemove) return
    removeAll.mutate(pendingRemove.id)
    setPendingRemove(null)
  }

  if (isLoading) return <Loader />

  return (
    <Container className="py-6">
      {!basket || basket.items.length === 0 ? (
        <div className="flex min-h-[480px] flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-neutral-900">Səbətiniz boşdur</p>
          <p className="mt-2 text-sm text-neutral-500">Sifariş vermək üçün səbətinizə məhsul əlavə edin</p>
        </div>
      ) : (
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold text-neutral-900">Səbətim</h1>
              <button
                type="button"
                onClick={() => clear.mutate()}
                className="cursor-pointer text-sm text-neutral-400 hover:text-neutral-600"
              >
                Səbəti təmizlə
              </button>
            </div>

            <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
              <div className="scrollbar-hide max-h-[calc(56vh+10px)] overflow-y-auto">
                {[...basket.items]
                  .sort((a, b) => a.id - b.id)
                  .map((item) => (
                  <div
                    key={item.id}
                    className="flex h-28 items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.img_url || PRODUCT_IMAGE_FALLBACK}
                          alt={item.product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{item.product.title}</p>
                        <p className="mt-1 text-sm text-neutral-500">{item.product.price} AZN</p>
                      </div>
                    </div>

                    <div className="flex h-11 items-center gap-3 rounded-[8px] bg-[#C0E8AD] px-2">
                      <button
                        type="button"
                        onClick={() =>
                          item.quantity > 1
                            ? remove.mutate(item.product.id)
                            : setPendingRemove({ id: item.product.id, title: item.product.title })
                        }
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#F4A6A6] text-white transition-colors hover:bg-[#EF8A8A]"
                      >
                        {item.quantity > 1 ? <Minus size={16} /> : <Trash2 size={16} />}
                      </button>
                      <span className="min-w-[1ch] text-base font-semibold text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => add.mutate(item.product.id)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#92D871] text-white transition-colors hover:bg-[#7CB760]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[400px] flex-shrink-0">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">Yekun məbləğ</h2>
            <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Ümumi</span>
                <span className="font-medium text-neutral-900">{basket.total} AZN</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-neutral-500">Çatırılma</span>
                <span className="font-medium text-neutral-900">Pulsuz</span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
                <span className="font-semibold text-neutral-900">Yekun məbləğ</span>
                <span className="font-semibold text-neutral-900">{basket.total} AZN</span>
              </div>

              <Link
                href="/checkout"
                className="mt-4 block w-full cursor-pointer rounded-[8px] bg-[#92D871] py-3 text-center text-base leading-5 font-semibold text-white transition-colors hover:bg-[#7CB760]"
              >
                Sifarişi tamamla
              </Link>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!pendingRemove}
        title="Məhsulu səbətdən silmək istəyirsiniz?"
        description={pendingRemove?.title}
        onConfirm={handleConfirmRemove}
        onCancel={() => setPendingRemove(null)}
      />
    </Container>
  )
}
