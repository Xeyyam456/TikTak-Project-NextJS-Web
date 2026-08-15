import { socialLinks } from '../constants'

export function SocialLinks() {
    return (
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
    )
}
