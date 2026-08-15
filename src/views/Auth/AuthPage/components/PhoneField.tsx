'use client'

import { useState } from 'react'
import { Controller, type FieldValues } from 'react-hook-form'
import { Input } from '@/shared/components'
import type { PhoneFieldProps } from '@/types'
import { inputClasses, labelClasses, labelStyle, errorClasses } from '../constants'
import { digitsFromPhoneValue, formatPhoneValue } from '../utils'

export function PhoneField<T extends FieldValues>({ control, name, error }: PhoneFieldProps<T>) {
    const [focused, setFocused] = useState(false)

    return (
        <div>
            <label className={labelClasses} style={labelStyle}>Telefon nömrəsi</label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Input
                        type="tel"
                        inputMode="numeric"
                        value={formatPhoneValue(digitsFromPhoneValue(field.value), focused)}
                        onChange={(e) => {
                            const nextDigits = digitsFromPhoneValue(e.target.value)
                            field.onChange(nextDigits ? `+994${nextDigits}` : '')
                        }}
                        onFocus={() => setFocused(true)}
                        onBlur={() => {
                            field.onBlur()
                            setFocused(false)
                        }}
                        placeholder="(+994) __ / ___ / __ / __"
                        className={inputClasses}
                    />
                )}
            />
            {error && <p className={errorClasses}>{error}</p>}
        </div>
    )
}
