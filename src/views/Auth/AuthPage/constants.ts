import { z } from 'zod'

export const PHONE_REGEX = /^\+994\d{9}$/

export const loginSchema = z.object({
    phone: z.string().regex(PHONE_REGEX, 'Telefon nömrəsini tam daxil edin'),
    password: z.string().min(1, 'Şifrəni daxil edin'),
})

export const registerSchema = z.object({
    full_name: z.string().trim().min(2, 'Adınızı daxil edin'),
    phone: z.string().regex(PHONE_REGEX, 'Telefon nömrəsini tam daxil edin'),
    password: z.string().min(4, 'Şifrə ən azı 4 simvol olmalıdır'),
})

export const inputClasses = 'w-[460px] pr-10'
export const labelClasses = 'mb-1 block text-sm font-medium text-neutral-700'
export const labelStyle = {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '0%',
}
export const tabTextStyle = {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: '21px',
    lineHeight: '100%',
    letterSpacing: '0%',
}
export const errorClasses = 'mt-1 text-xs text-red-600'
export const submitClasses =
    'mt-2 w-full rounded-[8px] bg-[#92D871] py-3 text-base font-bold text-white transition-colors hover:bg-[#7CB760] disabled:opacity-50'
export const submitStyle = {
    width: '460px',
    height: '50px',
}
