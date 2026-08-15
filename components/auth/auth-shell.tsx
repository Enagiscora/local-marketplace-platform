'use client'

import type { ReactNode } from 'react'
import { ShieldCheck, MapPin, Wallet, Star } from 'lucide-react'
import { Brand } from '@/components/brand'

const HIGHLIGHTS = [
  { icon: MapPin, title: 'Hyper-local discovery', text: 'Find trending products from sellers in your exact locality.' },
  { icon: ShieldCheck, title: 'Verified with NIN', text: 'Every account is tied to a National ID to keep the market clean.' },
  { icon: Wallet, title: 'Escrow-protected pay', text: 'Funds are held safely in-app until both parties are satisfied.' },
  { icon: Star, title: 'Trust ratings', text: 'Sellers build a 5-star reputation that powers local recommendations.' },
]

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-svh w-full flex-col lg:flex-row">
      {/* Brand / marketing panel */}
      <aside className="relative hidden w-full max-w-md flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="relative">
          <Brand variant="inverse" />
          <h1 className="mt-12 text-3xl font-bold leading-tight text-balance">
            The marketplace built for your street, not just your country.
          </h1>
          <p className="mt-4 max-w-sm leading-relaxed text-primary-foreground/80">
            Buy and sell with real people around you — from Surulere to Sabon Gari.
          </p>
        </div>
        <ul className="relative mt-10 flex flex-col gap-5">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm leading-relaxed text-primary-foreground/70">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Form panel */}
      <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Brand />
          </div>
          {children}
        </div>
      </section>
    </main>
  )
}
