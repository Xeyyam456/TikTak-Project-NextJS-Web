'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components'
import { authService } from '@/services'
import type { RegisterFormProps, SignupPayload } from '@/types'
import { registerSchema, inputClasses, labelClasses, labelStyle, errorClasses, submitClasses, submitStyle } from '../constants'
import { PasswordVisibilityIcon } from './PasswordVisibilityIcon'
import { PhoneField } from './PhoneField'

export function RegisterForm({ onSuccess, onError, onSwitchToLogin }: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<SignupPayload>({
        resolver: zodResolver(registerSchema),
        defaultValues: { full_name: '', phone: '', password: '' },
    })

    const onSubmit = form.handleSubmit(async (values) => {
        onError('')
        try {
            await authService.signup(values)
            form.reset()
            onSuccess('Qeydiyyat tamamlandı. İndi daxil ola bilərsiniz.')
        } catch {
            onError('Qeydiyyat zamanı xəta baş verdi.')
        }
    })

    return (
        <form className="flex flex-col" style={{ gap: '38px' }} onSubmit={onSubmit} noValidate>
            <div>
                <label className={labelClasses} style={labelStyle}>Ad</label>
                <Input type="text" placeholder="Ad, Soyad" {...form.register('full_name')} className={inputClasses} />
                {form.formState.errors.full_name && (
                    <p className={errorClasses}>{form.formState.errors.full_name.message}</p>
                )}
            </div>

            <PhoneField control={form.control} name="phone" error={form.formState.errors.phone?.message} />

            <div>
                <label className={labelClasses} style={labelStyle}>Parol</label>
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
                Hesabın var?{' '}
                <button type="button" onClick={onSwitchToLogin} className="font-semibold text-[#92D871]">
                    Daxil ol
                </button>
            </p>
        </form>
    )
}
