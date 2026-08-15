'use client'

import { Button } from '../Button'
import type { ConfirmModalProps } from '@/types'

export function ConfirmModal({
    open,
    title,
    description,
    confirmLabel = 'Bəli, sil',
    cancelLabel = 'İmtina',
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!open) return null

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                onCancel()
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg"
            >
                <p className="text-lg font-semibold text-neutral-900">{title}</p>
                {description && <p className="mt-2 text-sm text-neutral-500">{description}</p>}

                <div className="mt-6 flex items-center gap-3">
                    <Button type="button" variant="secondary" onClick={onCancel} className="flex-1 py-2.5 text-sm font-semibold">
                        {cancelLabel}
                    </Button>
                    <Button type="button" onClick={onConfirm} className="flex-1 py-2.5 text-sm font-semibold">
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}
