'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { AuthPageProps, AuthTab } from '@/types'
import { tabTextStyle } from './constants'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'

export function AuthPage({ initialTab }: AuthPageProps) {
    const [activeTab, setActiveTab] = useState<AuthTab>(initialTab)
    const [serverError, setServerError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const switchTab = (tab: AuthTab) => {
        setActiveTab(tab)
        setServerError(null)
        setSuccessMessage(null)
    }

    return (
        <div className="flex min-h-screen w-full">
            <div className="relative hidden w-1/2 flex-shrink-0 overflow-hidden bg-[#76CB4F] text-white md:block">
                <p
                    className="absolute z-10"
                    style={{
                        width: '400px',
                        height: '71px',
                        top: '30px',
                        left: '40px',
                        opacity: 1,
                        fontFamily: 'var(--font-roboto)',
                        fontWeight: 800,
                        fontSize: '80px',
                        lineHeight: '100%',
                        letterSpacing: '0.03em',
                        color: '#2B3043',
                    }}
                >
                    TIK TAK
                </p>
                <Image
                    src="/images/auth-illustration.svg"
                    alt=""
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover"
                />
            </div>

            <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2 md:p-12">
                <div style={{ width: '460px', height: '495px' }}>
                    <div className="mb-[42px] flex w-full border-b border-neutral-200">
                        <button
                            type="button"
                            onClick={() => switchTab('login')}
                            style={tabTextStyle}
                            className={`flex-1 pb-3 text-center transition-colors ${activeTab === 'login'
                                ? 'border-b-[1.5px] border-[#92D871] text-[#92D871]'
                                : 'text-neutral-400 hover:text-neutral-600'
                                }`}
                        >
                            Daxil ol
                        </button>
                        <button
                            type="button"
                            onClick={() => switchTab('register')}
                            style={tabTextStyle}
                            className={`flex-1 pb-3 text-center transition-colors ${activeTab === 'register'
                                ? 'border-b-[1.5px] border-[#92D871] text-[#92D871]'
                                : 'text-neutral-400 hover:text-neutral-600'
                                }`}
                        >
                            Qeydiyyatdan keç
                        </button>
                    </div>

                    {serverError && (
                        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>
                    )}
                    {successMessage && (
                        <p className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{successMessage}</p>
                    )}

                    {activeTab === 'login' ? (
                        <LoginForm
                            onSuccess={() => setServerError(null)}
                            onError={(message) => setServerError(message || null)}
                            onSwitchToRegister={() => switchTab('register')}
                        />
                    ) : (
                        <RegisterForm
                            onSuccess={(message) => {
                                setActiveTab('login')
                                setServerError(null)
                                setSuccessMessage(message)
                            }}
                            onError={(message) => setServerError(message || null)}
                            onSwitchToLogin={() => switchTab('login')}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
