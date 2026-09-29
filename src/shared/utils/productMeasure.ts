import { ProductMeasure } from '@/types'

export const PRODUCT_MEASURE_LABELS: Record<ProductMeasure, string> = {
    [ProductMeasure.KG]: 'kq',
    [ProductMeasure.GR]: 'qr',
    [ProductMeasure.LITRE]: 'litr',
    [ProductMeasure.ML]: 'ml',
    [ProductMeasure.METER]: 'metr',
    [ProductMeasure.CM]: 'sm',
    [ProductMeasure.MM]: 'mm',
    [ProductMeasure.PIECE]: 'ədəd',
    [ProductMeasure.PACKET]: 'paket',
    [ProductMeasure.BOX]: 'qutu',
}

export const getMeasureLabel = (type: ProductMeasure) => PRODUCT_MEASURE_LABELS[type] ?? type
