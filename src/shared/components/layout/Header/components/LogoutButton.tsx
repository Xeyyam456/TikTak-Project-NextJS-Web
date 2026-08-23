'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/components/Button'
import { ConfirmModal } from '@/shared/components/ConfirmModal'
import { clearTokens } from '@/services/httpClient'

export function LogoutButton() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false)

    const handleConfirmLogout = () => {
        clearTokens()
        queryClient.clear()
        setConfirmLogoutOpen(false)
        toast.success('Hesabdan uğurla çıxdınız')
        router.push('/')
    }

    return (
        <>
            <Button
                type="button"
                variant="ghost"
                onClick={() => setConfirmLogoutOpen(true)}
                className="flex items-center gap-[10px] hover:text-emerald"
            >
                <LogOut size={17} />
                Çıxış
            </Button>

            <ConfirmModal
                open={confirmLogoutOpen}
                title="Hesabdan çıxmaq istəyirsiniz?"
                confirmLabel="Bəli, çıx"
                cancelLabel="İmtina"
                onConfirm={handleConfirmLogout}
                onCancel={() => setConfirmLogoutOpen(false)}
            />
        </>
    )
}
