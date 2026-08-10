'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authService } from '@/services'
import { setTokens } from '@/services/httpClient'
import type { AuthPageProps, AuthTab, LoginPayload, SignupPayload } from '@/types'

const PHONE_REGEX = /^\+994\d{9}$/

function digitsFromPhoneValue(value: string) {
    let raw = value.replace(/\D/g, '')
    if (raw.startsWith('994')) raw = raw.slice(3)
    return raw.slice(0, 9)
}

function formatPhoneValue(digits: string, showPrefix: boolean) {
    if (!digits) return showPrefix ? '(+994) ' : ''
    const groups = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean)
    return `(+994) ${groups.join(' ')}`
}

const loginSchema = z.object({
    phone: z.string().regex(PHONE_REGEX, 'Telefon nömrəsini tam daxil edin'),
    password: z.string().min(1, 'Şifrəni daxil edin'),
})

const registerSchema = z.object({
    full_name: z.string().trim().min(2, 'Adınızı daxil edin'),
    phone: z.string().regex(PHONE_REGEX, 'Telefon nömrəsini tam daxil edin'),
    password: z.string().min(4, 'Şifrə ən azı 4 simvol olmalıdır'),
})

const inputClasses =
    'w-full border border-neutral-100 bg-neutral-50 px-4 py-2 pr-10 text-sm text-neutral-800 focus:border-[#92D871] focus:outline-none placeholder:text-neutral-400'
const inputStyle = {
    width: '460px',
    height: '50px',
    borderRadius: '10px',
    opacity: 1,
}
const labelClasses = 'mb-1 block text-sm font-medium text-neutral-700'
const labelStyle = {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '0%',
}
const tabTextStyle = {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: '21px',
    lineHeight: '100%',
    letterSpacing: '0%',
}
const errorClasses = 'mt-1 text-xs text-red-600'
const submitClasses =
    'mt-2 w-full rounded-[10px] bg-[#92D871] py-3 text-base font-bold text-white transition-colors hover:bg-[#7CB760] disabled:opacity-50'
const submitStyle = {
    width: '460px',
    height: '50px',
}

function EyeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

function EyeOffIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
            <line x1="2" y1="18" x2="18" y2="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

export function AuthPage({ initialTab }: AuthPageProps) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<AuthTab>(initialTab)
    const [serverError, setServerError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [showLoginPassword, setShowLoginPassword] = useState(false)
    const [showRegisterPassword, setShowRegisterPassword] = useState(false)
    const [loginPhoneFocused, setLoginPhoneFocused] = useState(false)
    const [registerPhoneFocused, setRegisterPhoneFocused] = useState(false)

    const loginForm = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues: { phone: '', password: '' },
    })

    const registerForm = useForm<SignupPayload>({
        resolver: zodResolver(registerSchema),
        defaultValues: { full_name: '', phone: '', password: '' },
    })

    const switchTab = (tab: AuthTab) => {
        setActiveTab(tab)
        setServerError(null)
        setSuccessMessage(null)
    }

    const onLogin = loginForm.handleSubmit(async (values) => {
        setServerError(null)
        try {
            const res = await authService.login(values)
            setTokens(res.data.tokens.access_token, res.data.tokens.refresh_token)
            router.push('/')
        } catch {
            setServerError('Telefon nömrəsi və ya şifrə yanlışdır.')
        }
    })

    const onRegister = registerForm.handleSubmit(async (values) => {
        setServerError(null)
        try {
            await authService.signup(values)
            registerForm.reset()
            setActiveTab('login')
            setSuccessMessage('Qeydiyyat tamamlandı. İndi daxil ola bilərsiniz.')
        } catch {
            setServerError('Qeydiyyat zamanı xəta baş verdi.')
        }
    })

    return (
        <div className="flex min-h-screen w-full">
            <div className="relative hidden w-1/2 flex-shrink-0 overflow-hidden bg-[#76CB4F] text-white md:block">
                <p
                    className="absolute z-10"
                    style={{
                        width: '400px',
                        height: '71px',
                        top: '30px',
                        left: '40px',
                        opacity: 1,
                        fontFamily: 'var(--font-roboto)',
                        fontWeight: 800,
                        fontSize: '80px',
                        lineHeight: '100%',
                        letterSpacing: '0.03em',
                        color: '#2B3043',
                    }}
                >
                    TIK TAK
                </p>
                <img
                    src="/images/auth-illustration.svg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2 md:p-12">
                <div
                    style={{
                        width: '460px',
                        height: '495px',
                    }}
                >
                    <div className="mb-[42px] flex w-full border-b border-neutral-200">
                        <button
                            type="button"
                            onClick={() => switchTab('login')}
                            style={tabTextStyle}
                            className={`flex-1 pb-3 text-center transition-colors ${activeTab === 'login'
                                ? 'border-b-[1.5px] border-[#92D871] text-[#92D871]'
                                : 'text-neutral-400 hover:text-neutral-600'
                                }`}
                        >
                            Daxil ol
                        </button>
                        <button
                            type="button"
                            onClick={() => switchTab('register')}
                            style={tabTextStyle}
                            className={`flex-1 pb-3 text-center transition-colors ${activeTab === 'register'
                                ? 'border-b-[1.5px] border-[#92D871] text-[#92D871]'
                                : 'text-neutral-400 hover:text-neutral-600'
                                }`}
                        >
                            Qeydiyyatdan keç
                        </button>
                    </div>

                    {serverError && (
                        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>
                    )}
                    {successMessage && (
                        <p className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{successMessage}</p>
                    )}

                    {activeTab === 'login' ? (
                        <form className="flex flex-col" style={{ gap: '38px' }} onSubmit={onLogin} noValidate>
                            <div>
                                <label className={labelClasses} style={labelStyle}>Telefon nömrəsi</label>
                                <Controller
                                    control={loginForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <input
                                            type="tel"
                                            inputMode="numeric"
                                            value={formatPhoneValue(digitsFromPhoneValue(field.value), loginPhoneFocused)}
                                            onChange={(e) => {
                                                const nextDigits = digitsFromPhoneValue(e.target.value)
                                                field.onChange(nextDigits ? `+994${nextDigits}` : '')
                                            }}
                                            onFocus={() => setLoginPhoneFocused(true)}
                                            onBlur={() => {
                                                field.onBlur()
                                                setLoginPhoneFocused(false)
                                            }}
                                            placeholder="(+994) __ / ___ / __ / __"
                                            className={`${inputClasses} text-neutral-800`}
                                            style={inputStyle}
                                        />
                                    )}
                                />
                                {loginForm.formState.errors.phone && (
                                    <p className={errorClasses}>{loginForm.formState.errors.phone.message}</p>
                                )}
                            </div>

                            <div>
                                <label className={labelClasses} style={labelStyle}>Şifrə</label>
                                <div className="relative">
                                    <input
                                        type={showLoginPassword ? 'text' : 'password'}
                                        placeholder="********************"
                                        {...loginForm.register('password')}
                                        className={inputClasses}
                                        style={inputStyle}
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        onClick={() => setShowLoginPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                    >
                                        {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {loginForm.formState.errors.password && (
                                    <p className={errorClasses}>{loginForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <button type="submit" disabled={loginForm.formState.isSubmitting} className={submitClasses} style={submitStyle}>
                                {loginForm.formState.isSubmitting ? 'Göndərilir...' : 'Tamamla'}
                            </button>

                            <p className="mt-[-28px] text-left text-sm text-neutral-500">
                                Hesabın yoxdur?{' '}
                                <button
                                    type="button"
                                    onClick={() => switchTab('register')}
                                    className="font-semibold text-[#92D871]"
                                >
                                    Qeydiyyatdan keç
                                </button>
                            </p>
                        </form>
                    ) : (
                        <form className="flex flex-col" style={{ gap: '38px' }} onSubmit={onRegister} noValidate>
                            <div>
                                <label className={labelClasses} style={labelStyle}>Ad</label>
                                <input
                                    type="text"
                                    placeholder="Ad, Soyad"
                                    {...registerForm.register('full_name')}
                                    className={inputClasses}
                                    style={inputStyle}
                                />
                                {registerForm.formState.errors.full_name && (
                                    <p className={errorClasses}>{registerForm.formState.errors.full_name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className={labelClasses} style={labelStyle}>Telefon nömrəsi</label>
                                <Controller
                                    control={registerForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <input
                                            type="tel"
                                            inputMode="numeric"
                                            value={formatPhoneValue(digitsFromPhoneValue(field.value), registerPhoneFocused)}
                                            onChange={(e) => {
                                                const nextDigits = digitsFromPhoneValue(e.target.value)
                                                field.onChange(nextDigits ? `+994${nextDigits}` : '')
                                            }}
                                            onFocus={() => setRegisterPhoneFocused(true)}
                                            onBlur={() => {
                                                field.onBlur()
                                                setRegisterPhoneFocused(false)
                                            }}
                                            placeholder="(+994) __ / ___ / __ / __"
                                            className={`${inputClasses} text-neutral-800`}
                                            style={inputStyle}
                                        />
                                    )}
                                />
                                {registerForm.formState.errors.phone && (
                                    <p className={errorClasses}>{registerForm.formState.errors.phone.message}</p>
                                )}
                            </div>

                            <div>
                                <label className={labelClasses} style={labelStyle}>Parol</label>
                                <div className="relative">
                                    <input
                                        type={showRegisterPassword ? 'text' : 'password'}
                                        placeholder="********************"
                                        {...registerForm.register('password')}
                                        className={inputClasses}
                                        style={inputStyle}
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        onClick={() => setShowRegisterPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                    >
                                        {showRegisterPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {registerForm.formState.errors.password && (
                                    <p className={errorClasses}>{registerForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <button type="submit" disabled={registerForm.formState.isSubmitting} className={submitClasses} style={submitStyle}>
                                {registerForm.formState.isSubmitting ? 'Göndərilir...' : 'Tamamla'}
                            </button>

                            <p className="mt-[-28px] text-left text-sm text-neutral-500">
                                Hesabın var?{' '}
                                <button type="button" onClick={() => switchTab('login')} className="font-semibold text-[#92D871]">
                                    Daxil ol
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
