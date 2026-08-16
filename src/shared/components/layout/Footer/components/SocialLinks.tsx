import { socialLinks } from '../constants'

export function SocialLinks() {
    return (
        <div className="flex items-center gap-[20px]">
            {socialLinks.map(({ label, icon: Icon }) => (
                <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-[50%] bg-social-bg text-emerald hover:bg-social-bg-hover"
                >
                    <Icon className="h-5 w-5" />
                </a>
            ))}
        </div>
    )
}
