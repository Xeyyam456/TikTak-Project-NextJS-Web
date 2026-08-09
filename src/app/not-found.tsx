import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
            <p className="text-4xl font-bold text-primary">404</p>
            <h2 className="text-xl font-semibold text-neutral-900">Səhifə tapılmadı</h2>
            <p className="text-sm text-neutral-500">Axtardığınız səhifə mövcud deyil və ya silinib.</p>
            <Link
                href="/"
                className="mt-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
                Ana səhifəyə qayıt
            </Link>
        </div>
    )
}
