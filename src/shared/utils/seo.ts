import type { Metadata } from 'next'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiktak.az'
export const SITE_NAME = 'TIK TAK'

interface BuildMetadataOptions {
    title: string
    description: string
    path: string
    robots?: { index: boolean; follow: boolean }
}

export function buildMetadata({ title, description, path, robots }: BuildMetadataOptions): Metadata {
    return {
        title,
        description,
        alternates: { canonical: path },
        robots: robots ?? { index: false, follow: false },
        openGraph: {
            title,
            description,
            url: path,
            siteName: SITE_NAME,
        },
        twitter: {
            title,
            description,
        },
    }
}
