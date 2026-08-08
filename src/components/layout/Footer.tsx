'use client'

import { useState } from 'react'
import Link from 'next/link'

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M13.5 21v-7h2.4l.4-3H13.5V9.2c0-.87.24-1.46 1.5-1.46h1.6V5.1C16.3 5.05 15.28 5 14.08 5 11.6 5 10 6.49 10 9.03V11H7.6v3H10v7h3.5z" />
        </svg>
    )
}

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
            <circle cx="12" cy="12" r="3.5" />
            <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
        </svg>
    )
}

function YoutubeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M22 8.6a2.8 2.8 0 0 0-2-2C18.2 6 12 6 12 6s-6.2 0-8 .6a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.5 12a29 29 0 0 0 .5 3.4 2.8 2.8 0 0 0 2 2c1.8.6 8 .6 8 .6s6.2 0 8-.6a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-3.4 29 29 0 0 0-.5-3.4Z" />
            <path d="M10 9.5v5l5-2.5-5-2.5Z" fill="white" />
        </svg>
    )
}

function LinkedinIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6.2c0-1.48-.03-3.38-2.07-3.38-2.07 0-2.38 1.62-2.38 3.28V21h-4V9Z" />
        </svg>
    )
}

function TelegramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M21.5 3.5 2.5 10.9c-.9.35-.9 1.62.02 1.9l4.9 1.5 1.86 5.86c.28.9 1.46 1.05 1.98.27l2.53-3.77 4.9 3.6c.78.57 1.9.12 2.06-.83l2.6-14.1c.17-.94-.77-1.68-1.85-1.32Z" />
            <path d="M7.42 14.3 17.8 7" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </svg>
    )
}

function TiktokIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M16.6 5.82a4.28 4.28 0 0 1-3.14-3.02h-2.9v13.3a2.62 2.62 0 1 1-1.86-2.5V10.6a5.6 5.6 0 1 0 4.76 5.53V9.36a7.14 7.14 0 0 0 4.1 1.3V7.7a4.28 4.28 0 0 1-.96-1.88Z" />
        </svg>
    )
}

function WhatsappIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2Zm5.85 14.15c-.25.7-1.45 1.36-2 1.45-.5.08-1.15.11-1.85-.12a14.9 14.9 0 0 1-3.55-1.75 12.3 12.3 0 0 1-3.05-3.7c-.32-.55-.65-1.2-.66-1.9 0-.6.3-1.15.65-1.55.3-.32.68-.4.9-.4h.62c.2 0 .45-.02.68.5.28.6.9 2.05.98 2.2.08.16.13.34.03.55-.32.68-.7.63-.85.85-.16.2-.32.42-.14.75.5.9 1.7 2.1 2.7 2.6.28.14.5.1.7-.1.24-.25.6-.7.85-.9.2-.16.4-.13.65-.03.63.25 1.55.68 1.8.8.24.12.4.18.46.28.08.13.08.62-.17 1.32Z" />
        </svg>
    )
}

function GlobeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
        </svg>
    )
}

const columns = [
    {
        title: 'Şirkət',
        links: [
            { label: 'Xüsusi təkliflər', href: '/' },
            { label: 'Haqqımızda', href: '/' },
            { label: 'Kartlar', href: '/' },
            { label: 'İcarəyə vermək istəyirsiniz?', href: '/' },
        ],
    },
    {
        title: 'Digər',
        links: [
            { label: 'Xəbərlər', href: '/' },
            { label: 'Karyera', href: '/' },
            { label: 'Müştəri xidmətləri', href: '/' },
        ],
    },
    {
        title: 'Hüquq',
        links: [
            { label: 'İstifadə şərtləri', href: '/' },
            { label: 'İmtina', href: '/' },
        ],
    },
]

export function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setSubscribed(true)
        setEmail('')
    }

    return (
        <footer className="border-t border-neutral-100 bg-neutral-50">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                        <p className="text-xl font-extrabold tracking-tight text-primary">TIK TAK</p>
                        <p className="mt-3 max-w-xs text-sm text-neutral-500">
                            Gündəlik ehtiyaclarınız üçün ən sərfəli qiymətlərlə supermarket təcrübəsi.
                        </p>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-sm font-semibold text-neutral-900">{column.title}</h3>
                            <ul className="mt-3 space-y-2">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-neutral-500 hover:text-primary">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="text-sm font-semibold text-neutral-900">Yeniliklərdən xəbərdar olun</h3>
                        <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-poçt ünvanınız"
                                className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
                            >
                                Abunə ol
                            </button>
                        </form>
                        {subscribed && <p className="mt-2 text-xs text-primary">Abunəliyiniz qeydə alındı!</p>}
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-neutral-400">
                        © {new Date().getFullYear()} TIK TAK. Bütün hüquqlar qorunur.
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <GlobeIcon />
                        Azərbaycan
                    </div>

                    <div className="flex items-center gap-3 text-neutral-500">
                        <a href="#" aria-label="Facebook" className="hover:text-primary">
                            <FacebookIcon />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-primary">
                            <InstagramIcon />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-primary">
                            <YoutubeIcon />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-primary">
                            <LinkedinIcon />
                        </a>
                        <a href="#" aria-label="Telegram" className="hover:text-primary">
                            <TelegramIcon />
                        </a>
                        <a href="#" aria-label="TikTok" className="hover:text-primary">
                            <TiktokIcon />
                        </a>
                        <a href="#" aria-label="WhatsApp" className="hover:text-primary">
                            <WhatsappIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

