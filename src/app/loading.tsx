export default function Loading() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-primary" />
            <p className="text-sm font-medium text-primary">Yüklənir...</p>
        </div>
    )
}
