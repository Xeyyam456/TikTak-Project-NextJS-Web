'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Banknote, Check, Clock, CreditCard } from 'lucide-react'
import { Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { basketQueryKey, useBasket } from '@/shared/hooks/useBasket'
import { profileService, orderService } from '@/services'
import { PaymentMethod } from '@/types'
import type { User } from '@/types'

const CONFIRM_SECONDS = 180

function ConfirmOrderModal({
    onConfirm,
    onCancel,
    onTimeout,
    submitting,
}: {
    onConfirm: () => void
    onCancel: () => void
    onTimeout: () => void
    submitting: boolean
}) {
    const [secondsLeft, setSecondsLeft] = useState(CONFIRM_SECONDS)

    useEffect(() => {
        if (secondsLeft <= 0) {
            onTimeout()
            return
        }
        const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
        return () => clearTimeout(timer)
    }, [secondsLeft, onTimeout])

    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#EFF9EA]">
                    <Clock className="h-16 w-16 text-[#92D871]" strokeWidth={1.5} />
                </div>
                <p className="mt-7 text-xl font-bold text-neutral-900">Sifarişinizi tesdiqləyiniz</p>
                <p className={`mt-2 text-sm ${secondsLeft <= 10 ? 'font-semibold text-red-500' : 'text-neutral-500'}`}>
                    vaxtın bitməsinə {minutes}:{String(seconds).padStart(2, '0')} qaldı
                </p>
                <div className="mt-7 flex gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={submitting}
                        className="flex-1 cursor-pointer rounded-[8px] bg-[#92D871] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7CB760] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Təsdiqlə
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={submitting}
                        className="flex-1 cursor-pointer rounded-[8px] border border-neutral-200 py-3 text-sm font-semibold text-neutral-400 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        İndi yox
                    </button>
                </div>
            </div>
        </div>
    )
}

function OrderSuccessModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-50 p-4">
            <div className="w-full max-w-3xl rounded-2xl bg-white px-12 py-24 text-center shadow-lg">
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-[#EFF9EA]">
                    <Check className="h-20 w-20 text-[#92D871]" strokeWidth={2.5} />
                </div>
                <p className="mt-8 text-2xl font-bold text-neutral-900">Sifariş uğurla tamamlandı</p>
                <p className="mt-3 text-base text-neutral-500">
                    Əməkdaşlarımız sizinlə əlaqə saxlayıb sifarişinizi göndərəcəklər.
                </p>
            </div>
        </div>
    )
}

export function CheckoutPage() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data: basket, isLoading: isBasketLoading } = useBasket()

    const [profile, setProfile] = useState<User | null>(null)
    const [isProfileLoading, setIsProfileLoading] = useState(true)
    const [note, setNote] = useState('')
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [modalStep, setModalStep] = useState<'idle' | 'confirming' | 'success'>('idle')

    const detailsCardRef = useRef<HTMLDivElement>(null)
    const [detailsCardHeight, setDetailsCardHeight] = useState<number>()

    useEffect(() => {
        profileService
            .get()
            .then((res) => setProfile(res.data))
            .finally(() => setIsProfileLoading(false))
    }, [])

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
                setModalStep('success')
                setTimeout(() => router.push('/orders'), 2000)
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

                    <div ref={detailsCardRef} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">Adınız</p>
                                    <p className="mt-1 text-sm text-neutral-500">{profile?.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">Ünvanınız</p>
                                    <p className="mt-1 text-sm text-neutral-500">
                                        {profile?.address ?? 'Ünvan seçilməyib'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">Telefon nömrəniz</p>
                                    <p className="mt-1 text-sm text-neutral-500">{profile?.phone}</p>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="note" className="text-sm font-semibold text-neutral-900">
                                    Əlavə qeyd
                                </label>
                                <textarea
                                    id="note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Əlavə qeydiniz varsa buraya daxil edin"
                                    className="mt-2 h-[130px] w-full resize-none rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <p className="mb-3 mt-6 text-sm font-semibold text-neutral-900">Ödəmə metodu seçin:</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod(PaymentMethod.CASH)}
                                className={`flex cursor-pointer items-center gap-3 rounded-[8px] border p-4 text-left transition-colors ${
                                    paymentMethod === PaymentMethod.CASH
                                        ? 'border-transparent bg-[#EFF9EA]'
                                        : 'border-neutral-200 bg-white'
                                }`}
                            >
                                <Banknote
                                    className={paymentMethod === PaymentMethod.CASH ? 'text-[#0A955E]' : 'text-neutral-400'}
                                    size={22}
                                />
                                <span
                                    className={`flex-1 text-sm font-medium ${
                                        paymentMethod === PaymentMethod.CASH ? 'text-[#0A955E]' : 'text-neutral-700'
                                    }`}
                                >
                                    Qapıda nağd ödəmə
                                </span>
                                <span
                                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                                        paymentMethod === PaymentMethod.CASH ? 'border-[#0A955E]' : 'border-neutral-300'
                                    }`}
                                >
                                    {paymentMethod === PaymentMethod.CASH && (
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#0A955E]" />
                                    )}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod(PaymentMethod.CARD)}
                                className={`flex cursor-pointer items-center gap-3 rounded-[8px] border p-4 text-left transition-colors ${
                                    paymentMethod === PaymentMethod.CARD
                                        ? 'border-transparent bg-[#EFF9EA]'
                                        : 'border-neutral-200 bg-white'
                                }`}
                            >
                                <CreditCard
                                    className={paymentMethod === PaymentMethod.CARD ? 'text-[#0A955E]' : 'text-neutral-400'}
                                    size={22}
                                />
                                <span
                                    className={`flex-1 text-sm font-medium ${
                                        paymentMethod === PaymentMethod.CARD ? 'text-[#0A955E]' : 'text-neutral-700'
                                    }`}
                                >
                                    Qapıda kart ilə ödəmə
                                </span>
                                <span
                                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                                        paymentMethod === PaymentMethod.CARD ? 'border-[#0A955E]' : 'border-neutral-300'
                                    }`}
                                >
                                    {paymentMethod === PaymentMethod.CARD && (
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#0A955E]" />
                                    )}
                                </span>
                            </button>
                        </div>

                        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

                        <button
                            type="button"
                            onClick={handleOpenConfirm}
                            disabled={submitting}
                            className="mt-6 w-full cursor-pointer rounded-[8px] bg-[#2B3043] py-3 text-base font-semibold text-white transition-colors hover:bg-[#1F2333] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Sifarişi tamamla
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h2 className="mb-4 text-lg font-semibold text-neutral-900">Xülasə</h2>
                    <div
                        style={{ height: detailsCardHeight && detailsCardHeight - 2 }}
                        className="flex min-h-0 flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
                    >
                        <div className="scrollbar-hide min-h-0 flex-1 space-y-3 overflow-y-auto">
                            {basket?.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-neutral-900">
                                        {item.quantity} x {item.product.title}
                                    </span>
                                    <span className="flex-shrink-0 font-medium text-neutral-900">
                                        {item.total_price} AZN
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex-shrink-0">
                            <div className="border-t border-neutral-100 pt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-neutral-500">Ümumi:</span>
                                    <span className="text-neutral-900">{basket?.total} AZN</span>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-sm">
                                    <span className="text-neutral-500">Çatdırılma:</span>
                                    <span className="text-neutral-900">Pulsuz</span>
                                </div>
                                <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-base font-bold text-neutral-900">
                                    <span>Yekun məbləğ</span>
                                    <span>{basket?.total} AZN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
