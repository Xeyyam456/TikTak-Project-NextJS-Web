import { Input } from '@/shared/components'
import type { PersonalInfoFieldsProps } from '@/types'

export function PersonalInfoFields({ register, errors, phone, email }: PersonalInfoFieldsProps) {
    return (
        <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Adınız</label>
                <Input type="text" placeholder="Adınız" className="w-full" {...register('full_name')} />
                {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>}
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Telefon nömrəsi</label>
                <Input type="tel" value={phone} disabled readOnly className="w-full" />
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">E-mail</label>
                <Input
                    type="email"
                    value={email}
                    placeholder="E-mail məlumatı mövcud deyil"
                    disabled
                    readOnly
                    className="w-full"
                />
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Ünvan</label>
                <Input type="text" placeholder="Ünvanınız" className="w-full" {...register('address')} />
            </div>
        </div>
    )
}
