import { Globe, Magnet } from 'lucide-react'
import { Container } from '../Container'
import { columns } from './constants'
import { FooterColumn } from './components/FooterColumn'
import { NewsletterForm } from './components/NewsletterForm'
import { SocialLinks } from './components/SocialLinks'

export function Footer() {
    return (
        <footer className="bg-white">
            <Container className="py-12 pb-[58px]">
                <p className="text-2xl font-extrabold tracking-tight text-neutral-900">TIK TAK</p>

                <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {columns.map((column) => (
                        <FooterColumn key={column.title} column={column} />
                    ))}
                    <NewsletterForm />
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

                    <SocialLinks />
                </div>
            </Container>
        </footer>
    )
}
