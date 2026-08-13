'use client'

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
            onClick={onCancel}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg"
            >
                <p className="text-lg font-semibold text-neutral-900">{title}</p>
                {description && <p className="mt-2 text-sm text-neutral-500">{description}</p>}

                <div className="mt-6 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 cursor-pointer rounded-full bg-[#F4A6A6] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#EF8A8A]"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 cursor-pointer rounded-full bg-[#92D871] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7CB760]"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
