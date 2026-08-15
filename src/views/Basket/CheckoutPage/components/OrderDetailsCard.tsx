import { Banknote, CreditCard } from 'lucide-react'
import { PaymentMethod } from '@/types'
import type { OrderDetailsCardProps } from '@/types'
import { PaymentMethodOption } from './PaymentMethodOption'

export function OrderDetailsCard({
    cardRef,
    profile,
    note,
    onNoteChange,
    paymentMethod,
    onPaymentMethodChange,
    error,
    submitting,
    onSubmit,
}: OrderDetailsCardProps) {
    return (
        <div ref={cardRef} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-neutral-900">Adınız</p>
                        <p className="mt-1 text-sm text-neutral-500">{profile?.full_name}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-neutral-900">Ünvanınız</p>
                        <p className="mt-1 text-sm text-neutral-500">{profile?.address ?? 'Ünvan seçilməyib'}</p>
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
                        onChange={(e) => onNoteChange(e.target.value)}
                        placeholder="Əlavə qeydiniz varsa buraya daxil edin"
                        className="mt-2 h-[130px] w-full resize-none rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-primary focus:outline-none"
                    />
                </div>
            </div>

            <p className="mb-3 mt-6 text-sm font-semibold text-neutral-900">Ödəmə metodu seçin:</p>
            <div className="grid grid-cols-2 gap-4">
                <PaymentMethodOption
                    icon={Banknote}
                    label="Qapıda nağd ödəmə"
                    method={PaymentMethod.CASH}
                    selected={paymentMethod === PaymentMethod.CASH}
                    onSelect={onPaymentMethodChange}
                />
                <PaymentMethodOption
                    icon={CreditCard}
                    label="Qapıda kart ilə ödəmə"
                    method={PaymentMethod.CARD}
                    selected={paymentMethod === PaymentMethod.CARD}
                    onSelect={onPaymentMethodChange}
                />
            </div>

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <button
                type="button"
                onClick={onSubmit}
                disabled={submitting}
                className="mt-6 w-full cursor-pointer rounded-[8px] bg-[#2B3043] py-3 text-base font-semibold text-white transition-colors hover:bg-[#1F2333] disabled:cursor-not-allowed disabled:opacity-50"
            >
                Sifarişi tamamla
            </button>
        </div>
    )
}
