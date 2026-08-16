'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@/shared/components'
import { authService } from '@/services'
import type { RegisterFormProps, SignupPayload } from '@/types'
import { registerSchema, inputClasses, labelClasses, labelStyle, errorClasses, submitClasses, submitStyle } from '../constants'
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle'
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
                    <PasswordVisibilityToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
                </div>
                {form.formState.errors.password && (
                    <p className={errorClasses}>{form.formState.errors.password.message}</p>
                )}
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting} className={submitClasses} style={submitStyle}>
                {form.formState.isSubmitting ? 'Göndərilir...' : 'Tamamla'}
            </Button>

            <p className="mt-[-28px] text-left text-sm text-neutral-500">
                Hesabın var?{' '}
                <Button type="button" variant="link" onClick={onSwitchToLogin} className="font-semibold">
                    Daxil ol
                </Button>
            </p>
        </form>
    )
}
