'use client'

import { useRef } from 'react'
import { Camera, User as UserIcon } from 'lucide-react'
import { Button } from '@/shared/components'
import type { AvatarUploaderProps } from '@/types'

export function AvatarUploader({ avatarPreview, uploading, onFileSelect }: AvatarUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        e.target.value = ''
        if (file) onFileSelect(file)
    }

    return (
        <div className="relative h-12 w-12 flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-100">
                {avatarPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                    <UserIcon size={20} className="text-neutral-400" />
                )}
            </div>
            <Button
                type="button"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                aria-label="Şəkli dəyiş"
                className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-mint text-white shadow-sm transition-colors hover:bg-mint-dark"
            >
                <Camera size={10} />
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
        </div>
    )
}
