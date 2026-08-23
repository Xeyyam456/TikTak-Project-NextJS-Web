import { PaymentMethod } from '@/types'

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
    [PaymentMethod.CASH]: 'Qapıda nağd ödəmə',
    [PaymentMethod.CARD]: 'Qapıda kart ilə ödəmə',
}
