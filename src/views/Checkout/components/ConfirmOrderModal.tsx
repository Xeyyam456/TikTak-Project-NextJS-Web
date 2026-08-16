'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { Button } from '@/shared/components'
import type { ConfirmOrderModalProps } from '@/types'
import { CONFIRM_SECONDS } from '../constants'

export function ConfirmOrderModal({ onConfirm, onCancel, onTimeout, submitting }: ConfirmOrderModalProps) {
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
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-emerald-pale">
                    <Clock className="h-16 w-16 text-mint" strokeWidth={1.5} />
                </div>
                <p className="mt-7 text-xl font-bold text-neutral-900">Sifarişinizi tesdiqləyiniz</p>
                <p className={`mt-2 text-sm ${secondsLeft <= 10 ? 'font-semibold text-red-500' : 'text-neutral-500'}`}>
                    vaxtın bitməsinə {minutes}:{String(seconds).padStart(2, '0')} qaldı
                </p>
                <div className="mt-7 flex gap-3">
                    <Button type="button" onClick={onConfirm} disabled={submitting} className="flex-1 py-3 text-sm font-semibold">
                        Təsdiqlə
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={submitting}
                        className="flex-1 py-3 text-sm font-semibold"
                    >
                        İndi yox
                    </Button>
                </div>
            </div>
        </div>
    )
}
