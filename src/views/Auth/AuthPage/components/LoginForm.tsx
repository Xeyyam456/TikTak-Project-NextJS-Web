'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button, Input } from '@/shared/components'
import { authService } from '@/services'
import { setTokens } from '@/services/httpClient'
import type { LoginFormProps, LoginPayload } from '@/types'
import { loginSchema, inputClasses, labelClasses, labelStyle, errorClasses, submitClasses, submitStyle } from '../constants'
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle'
import { PhoneField } from './PhoneField'

export function LoginForm({ onSuccess, onError, onSwitchToRegister }: LoginFormProps) {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)

    const form = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues: { phone: '', password: '' },
    })

    const onSubmit = form.handleSubmit(async (values) => {
        onError('')
        try {
            const res = await authService.login(values)
            setTokens(res.data.tokens.access_token, res.data.tokens.refresh_token, rememberMe)
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
                    <PasswordVisibilityToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
                </div>
                {form.formState.errors.password && (
                    <p className={errorClasses}>{form.formState.errors.password.message}</p>
                )}
            </div>

            <label className="-mt-6 flex items-center gap-2 text-sm text-neutral-500">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 accent-primary"
                />
                Sesiyani yadda saxla 
            </label>

            <Button type="submit" disabled={form.formState.isSubmitting} className={submitClasses} style={submitStyle}>
                {form.formState.isSubmitting ? 'Göndərilir...' : 'Tamamla'}
            </Button>

            <p className="mt-[-28px] text-left text-sm text-neutral-500">
                Hesabın yoxdur?{' '}
                <Button type="button" variant="link" onClick={onSwitchToRegister} className="font-semibold">
                    Qeydiyyatdan keç
                </Button>
            </p>
        </form>
    )
}
