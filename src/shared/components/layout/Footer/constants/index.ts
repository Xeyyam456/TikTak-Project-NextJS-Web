import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import type { FooterColumn, FooterSocialLink } from '@/types'

export const socialLinks: FooterSocialLink[] = [
    { label: 'Facebook', icon: FaFacebookF },
    { label: 'Instagram', icon: FaInstagram },
    { label: 'YouTube', icon: FaYoutube },
    { label: 'LinkedIn', icon: FaLinkedinIn },
    { label: 'Telegram', icon: FaTelegram },
    { label: 'TikTok', icon: FaTiktok },
    { label: 'WhatsApp', icon: FaWhatsapp },
]

export const columns: FooterColumn[] = [
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
