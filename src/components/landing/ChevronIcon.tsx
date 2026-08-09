export function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7">
            <path
                d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
