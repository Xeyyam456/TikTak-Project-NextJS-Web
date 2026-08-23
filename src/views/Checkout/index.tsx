'use client'

import { Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { useBasket } from '@/shared/hooks/useBasket'
import { useProfile } from '@/shared/hooks/useProfile'
import { ConfirmOrderModal } from './components/ConfirmOrderModal'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import { OrderDetailsCard } from './components/OrderDetailsCard'
import { OrderSummaryCard } from './components/OrderSummaryCard'
import { useCheckoutSubmit } from './hooks/useCheckoutSubmit'
import { useElementHeight } from './hooks/useElementHeight'

export function CheckoutPage() {
    const { data: basket, isLoading: isBasketLoading } = useBasket()
    const { data: profile, isLoading: isProfileLoading } = useProfile()
    const { ref: detailsCardRef, height: detailsCardHeight } = useElementHeight<HTMLDivElement>([
        isBasketLoading,
        isProfileLoading,
    ])

    const {
        note,
        setNote,
        paymentMethod,
        setPaymentMethod,
        submitting,
        error,
        modalStep,
        handleOpenConfirm,
        handleConfirmOrder,
        handleCloseConfirm,
    } = useCheckoutSubmit(profile)

    if (isBasketLoading || isProfileLoading) return <Loader />

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
