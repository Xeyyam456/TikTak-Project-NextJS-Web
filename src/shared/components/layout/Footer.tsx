'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Globe, Magnet } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import { Container } from './Container'

const socialLinks = [
    { label: 'Facebook', icon: FaFacebookF },
    { label: 'Instagram', icon: FaInstagram },
    { label: 'YouTube', icon: FaYoutube },
    { label: 'LinkedIn', icon: FaLinkedinIn },
    { label: 'Telegram', icon: FaTelegram },
    { label: 'TikTok', icon: FaTiktok },
    { label: 'WhatsApp', icon: FaWhatsapp },
]

const columns = [
    {
        title: 'Şirkət',
        links: [
            { label: 'Xüsusi təkliflər', href: '/' },
            { label: 'Haqqımızda', href: '/' },
            { label: 'Kartlar', href: '/' },
            { label: 'İcarəyə vermtəyə yeriniz var?', href: '/' },
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
            { label: 'Onlayn market', href: '/' },
            { label: 'Marketlərimiz', href: '/' },
            { label: 'Korporativ satış', href: '/' },
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
        <footer className="bg-white">
            <Container className="py-12 pb-[58px]">
                <p className="text-2xl font-extrabold tracking-tight text-neutral-900">TIK TAK</p>

                <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-[22px] font-semibold text-primary">{column.title}</h3>
                            <ul className="mt-3 space-y-2">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-[18px] text-neutral-500 hover:text-[#0A955E]">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="text-[22px] font-semibold text-primary">Yeniliklərə abunə olun</h3>
                        <form onSubmit={handleSubscribe} className="mt-3 flex gap-2 rounded-[8px] border border-neutral-200 p-1 focus-within:border-primary">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail daxil edin"
                                className="w-full px-2 text-sm outline-none"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-[8px] bg-[#0A955E] px-4 py-2 text-sm font-medium text-white hover:bg-[#087a4b]"
                            >
                                Gönder
                            </button>
                        </form>
                        {subscribed && <p className="mt-2 text-xs text-primary">Abunəliyiniz qeydə alındı!</p>}
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-neutral-500">
                        © {new Date().getFullYear()} Azerbaijan Supermarket. Bütün hüquqlar qorunur
                    </p>

                    <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                        Site by
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-[#F5C518] text-black">
                            <Magnet className="h-3 w-3" />
                        </span>
                        <span className="font-semibold text-neutral-900">JIS</span>
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-primary">
                        <Globe className="h-4 w-4" />
                        Azərbaycan
                    </div>

                    <div className="flex items-center gap-[20px]">
                        {socialLinks.map(({ label, icon: Icon }) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="flex h-12 w-12 items-center justify-center rounded-[50%] bg-[#F4FAF5] text-[#0A955E] hover:bg-[#e3f3e8]"
                            >
                                <Icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    )
}

