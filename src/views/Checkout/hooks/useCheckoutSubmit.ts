import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { basketQueryKey } from '@/shared/hooks/useBasket'
import { ordersQueryKey } from '@/shared/hooks/useOrders'
import { orderService } from '@/services'
import { PaymentMethod } from '@/types'
import type { User } from '@/types'

export function useCheckoutSubmit(profile: User | undefined) {
    const router = useRouter()
    const queryClient = useQueryClient()

    const [note, setNote] = useState('')
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [modalStep, setModalStep] = useState<'idle' | 'confirming' | 'success'>('idle')

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

    return {
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
    }
}
