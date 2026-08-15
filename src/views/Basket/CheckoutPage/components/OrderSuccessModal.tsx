import { Check } from 'lucide-react'

export function OrderSuccessModal() {
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
