import Link from 'next/link'
import type { ProductCardProps } from '@/types'

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block rounded-lg border border-neutral-200 p-3">
      <div className="aspect-square w-full rounded-md bg-neutral-100" />
      <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
      <p className="text-sm text-neutral-500">
        {product.price} AZN / {product.type}
      </p>
    </Link>
  )
}
