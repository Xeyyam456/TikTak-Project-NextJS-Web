'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PaginationProps } from '@/types'

export function Pagination({ currentPage, totalPages, onPageChange, total, pageSize, className = '' }: PaginationProps) {
    if (totalPages <= 1) return null

    const pageNumbers: (number | '...')[] = []
    for (let page = 1; page <= totalPages; page += 1) {
        if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
            pageNumbers.push(page)
        } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
            pageNumbers.push('...')
        }
    }

    const showCount = total !== undefined && pageSize !== undefined
    const start = total === 0 ? 0 : (currentPage - 1) * (pageSize ?? 0) + 1
    const end = Math.min(total ?? 0, currentPage * (pageSize ?? 0))

    return (
        <div className={`flex flex-wrap items-center justify-end gap-4 text-sm text-neutral-700 ${className}`}>
            {showCount && (
                <span>
                    {start}-{end} / {total} nəticə
                </span>
            )}

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Əvvəlki səhifə"
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[8px] text-neutral-500 transition-colors hover:bg-neutral-200 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <ChevronLeft size={16} />
                </button>

                {pageNumbers.map((page, index) =>
                    page === '...' ? (
                        <span key={`dots-${index}`} className="px-1 text-neutral-400">
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-[8px] border text-xs font-medium transition-colors ${
                                page === currentPage
                                    ? 'border-[#92D871] text-[#92D871] hover:bg-transparent'
                                    : 'border-transparent text-neutral-700 hover:bg-neutral-200'
                            }`}
                        >
                            {page}
                        </button>
                    ),
                )}

                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Növbəti səhifə"
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[8px] text-neutral-500 transition-colors hover:bg-neutral-200 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}
