import Link from 'next/link'
import type { FooterColumnProps } from '@/types'

export function FooterColumn({ column }: FooterColumnProps) {
    return (
        <div>
            <h3 className="text-[22px] font-semibold text-primary">{column.title}</h3>
            <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-[18px] text-neutral-500 hover:text-emerald">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
