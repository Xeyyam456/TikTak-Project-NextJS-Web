'use client'

import { useState } from 'react'

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
                <button
                    type="submit"
                    className="shrink-0 rounded-[8px] bg-[#0A955E] px-4 py-2 text-sm font-medium text-white hover:bg-[#087a4b]"
                >
                    Gönder
                </button>
            </form>
            {subscribed && <p className="mt-2 text-xs text-primary">Abunəliyiniz qeydə alındı!</p>}
        </div>
    )
}
