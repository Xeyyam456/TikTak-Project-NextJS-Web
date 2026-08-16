import basketEmpty from '@/assets/images/basket-empty.svg'

export function EmptyBasketState() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={basketEmpty.src} alt="" className="h-[300px] w-auto" />
            <p className="mt-5 text-xl font-bold text-emerald">Səbətiniz boşdur</p>
            <p className="mt-2 text-sm text-neutral-500">Sifariş vermək üçün səbətinizə məhsul əlavə edin</p>
        </div>
    )
}
