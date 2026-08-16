'use client'

import { useState } from 'react'
import { Button } from '@/shared/components'

export function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setSubscribed(true)
        setEmail('')
    }

    return (
        <div>
            <h3 className="text-[22px] font-semibold text-primary">Yeniliklərə abunə olun</h3>
            <form
                onSubmit={handleSubscribe}
                className="mt-3 flex gap-2 rounded-[8px] border border-neutral-200 p-1 focus-within:border-primary"
            >
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail daxil edin"
                    className="w-full px-2 text-sm outline-none"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    className="shrink-0 rounded-[8px] bg-emerald px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-dark"
                >
                    Gönder
                </Button>
            </form>
            {subscribed && <p className="mt-2 text-xs text-primary">Abunəliyiniz qeydə alındı!</p>}
        </div>
    )
}
