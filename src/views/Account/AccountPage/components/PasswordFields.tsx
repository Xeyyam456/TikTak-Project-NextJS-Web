import { Input } from '@/shared/components'
import type { PasswordFieldsProps } from '@/types'

export function PasswordFields({ register, errors }: PasswordFieldsProps) {
    return (
        <div className="space-y-6 border-t border-neutral-100 pt-8">
            <div>
                <h3 className="text-base font-semibold text-neutral-900">Şifrənin yenilənməsi</h3>
                <p className="text-xs text-neutral-400">Ehtiyac yoxdursa boş buraxın</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">Yeni Şifrə</label>
                    <Input type="password" className="w-full" {...register('password')} />
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">Yeni Şifrənin təkrarı</label>
                    <Input type="password" className="w-full" {...register('password_repeat')} />
                    {errors.password_repeat && (
                        <p className="mt-1 text-xs text-red-600">{errors.password_repeat.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
