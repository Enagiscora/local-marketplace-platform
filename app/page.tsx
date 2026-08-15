'use client'

import { useState } from 'react'
import { AuthShell } from '@/components/auth/auth-shell'
import { SignUpForm } from '@/components/auth/signup-form'
import { LoginForm } from '@/components/auth/login-form'
import { SellerOnboarding } from '@/components/onboarding/seller-onboarding'
import { BuyerOnboarding } from '@/components/onboarding/buyer-onboarding'
import { CompleteScreen } from '@/components/complete-screen'
import { useApp, type Role } from '@/lib/store'
import { cn } from '@/lib/utils'

type Step = 'signup' | 'login' | 'onboarding' | 'complete'

const ONBOARDING_STEPS = ['Account', 'Verify', 'Profile'] as const

function Stepper({ current }: { current: number }) {
  return (
    <ol className="mb-6 flex items-center gap-2">
      {ONBOARDING_STEPS.map((label, i) => {
        const active = i <= current
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
              )}
            >
              {i + 1}
            </span>
            <span className={cn('text-xs font-medium', active ? 'text-foreground' : 'text-muted-foreground')}>
              {label}
            </span>
            {i < ONBOARDING_STEPS.length - 1 && (
              <span className={cn('h-px flex-1', active ? 'bg-primary/40' : 'bg-border')} />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default function Page() {
  const { currentUser, logOut } = useApp()
  const [step, setStep] = useState<Step>('signup')
  const [role, setRole] = useState<Role | null>(null)

  function handleSignUpSuccess(r: Role) {
    setRole(r)
    setStep('onboarding')
  }

  function handleLoginSuccess() {
    setStep('complete')
  }

  function handleLogout() {
    logOut()
    setRole(null)
    setStep('login')
  }

  return (
    <AuthShell>
      {step === 'signup' && (
        <SignUpForm onSuccess={handleSignUpSuccess} onSwitchToLogin={() => setStep('login')} />
      )}

      {step === 'login' && (
        <LoginForm onSuccess={handleLoginSuccess} onSwitchToSignUp={() => setStep('signup')} />
      )}

      {step === 'onboarding' && (
        <div>
          <Stepper current={2} />
          {(role ?? currentUser?.role) === 'seller' ? (
            <SellerOnboarding onDone={() => setStep('complete')} />
          ) : (
            <BuyerOnboarding onDone={() => setStep('complete')} />
          )}
        </div>
      )}

      {step === 'complete' && <CompleteScreen onLogout={handleLogout} />}
    </AuthShell>
  )
}
