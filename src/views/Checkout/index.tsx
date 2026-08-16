'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { basketQueryKey, useBasket } from '@/shared/hooks/useBasket'
import { ordersQueryKey } from '@/shared/hooks/useOrders'
import { useProfile } from '@/shared/hooks/useProfile'
import { orderService } from '@/services'
import { PaymentMethod } from '@/types'
import { ConfirmOrderModal } from './components/ConfirmOrderModal'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import { OrderDetailsCard } from './components/OrderDetailsCard'
import { OrderSummaryCard } from './components/OrderSummaryCard'

export function CheckoutPage() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data: basket, isLoading: isBasketLoading } = useBasket()
    const { data: profile, isLoading: isProfileLoading } = useProfile()

    const [note, setNote] = useState('')
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [modalStep, setModalStep] = useState<'idle' | 'confirming' | 'success'>('idle')

    const detailsCardRef = useRef<HTMLDivElement>(null)
    const [detailsCardHeight, setDetailsCardHeight] = useState<number>()

    useEffect(() => {
        if (!detailsCardRef.current) return
        const observer = new ResizeObserver(([entry]) =>
            setDetailsCardHeight((entry.target as HTMLElement).getBoundingClientRect().height),
        )
        observer.observe(detailsCardRef.current)
        return () => observer.disconnect()
    }, [isBasketLoading, isProfileLoading])

    if (isBasketLoading || isProfileLoading) return <Loader />

    const handleOpenConfirm = () => {
        if (!profile?.address) {
            setError('Sifariş vermək üçün ünvanınızı əlavə edin')
            return
        }
        setError(null)
        setModalStep('confirming')
    }

    const handleConfirmOrder = () => {
        if (!profile?.address) return

        setSubmitting(true)
        setError(null)
        orderService
            .checkout({ paymentMethod, note: note || undefined, address: profile.address, phone: profile.phone })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: basketQueryKey })
                queryClient.invalidateQueries({ queryKey: ordersQueryKey })
                setModalStep('success')
                setTimeout(() => router.push('/account/orders'), 2000)
            })
            .catch(() => {
                setModalStep('idle')
                setError('Sifariş tamamlanmadı, yenidən cəhd edin')
            })
            .finally(() => setSubmitting(false))
    }

    const handleCloseConfirm = () => setModalStep('idle')

    return (
        <Container className="py-6">
            <div className="grid grid-cols-[1fr_400px] items-start gap-6">
                <div className="flex flex-col">
                    <h1 className="mb-4 text-xl font-semibold text-neutral-900">Sifarişin tamamlanması</h1>

                    <OrderDetailsCard
                        cardRef={detailsCardRef}
                        profile={profile}
                        note={note}
                        onNoteChange={setNote}
                        paymentMethod={paymentMethod}
                        onPaymentMethodChange={setPaymentMethod}
                        error={error}
                        submitting={submitting}
                        onSubmit={handleOpenConfirm}
                    />
                </div>

                <OrderSummaryCard basket={basket} height={detailsCardHeight} />
            </div>

            {modalStep === 'confirming' && (
                <ConfirmOrderModal
                    onConfirm={handleConfirmOrder}
                    onCancel={handleCloseConfirm}
                    onTimeout={handleCloseConfirm}
                    submitting={submitting}
                />
            )}
            {modalStep === 'success' && <OrderSuccessModal />}
        </Container>
    )
}
