'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Input } from '@/shared/components'
import { authService } from '@/services'
import { setTokens } from '@/services/httpClient'
import type { LoginFormProps, LoginPayload } from '@/types'
import { loginSchema, inputClasses, labelClasses, labelStyle, errorClasses, submitClasses, submitStyle } from '../constants'
import { PasswordVisibilityIcon } from './PasswordVisibilityIcon'
import { PhoneField } from './PhoneField'

export function LoginForm({ onSuccess, onError, onSwitchToRegister }: LoginFormProps) {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues: { phone: '', password: '' },
    })

    const onSubmit = form.handleSubmit(async (values) => {
        onError('')
        try {
            const res = await authService.login(values)
            setTokens(res.data.tokens.access_token, res.data.tokens.refresh_token)
            toast.success('Uğurla daxil oldunuz')
            onSuccess()
            router.push('/')
        } catch {
            onError('Telefon nömrəsi və ya şifrə yanlışdır.')
        }
    })

    return (
        <form className="flex flex-col" style={{ gap: '38px' }} onSubmit={onSubmit} noValidate>
            <PhoneField control={form.control} name="phone" error={form.formState.errors.phone?.message} />

            <div>
                <label className={labelClasses} style={labelStyle}>Şifrə</label>
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********************"
                        {...form.register('password')}
                        className={inputClasses}
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                        <PasswordVisibilityIcon visible={showPassword} />
                    </button>
                </div>
                {form.formState.errors.password && (
                    <p className={errorClasses}>{form.formState.errors.password.message}</p>
                )}
            </div>

            <button type="submit" disabled={form.formState.isSubmitting} className={submitClasses} style={submitStyle}>
                {form.formState.isSubmitting ? 'Göndərilir...' : 'Tamamla'}
            </button>

            <p className="mt-[-28px] text-left text-sm text-neutral-500">
                Hesabın yoxdur?{' '}
                <button type="button" onClick={onSwitchToRegister} className="font-semibold text-[#92D871]">
                    Qeydiyyatdan keç
                </button>
            </p>
        </form>
    )
}
