'use client'

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabKey = 'suggestions' | 'search' | 'history' | 'wallet' | 'profile'

export type TabDef = {
  key: TabKey
  label: string
  icon: LucideIcon
}

export function DashboardShell({
  header,
  tabs,
  active,
  onTabChange,
  children,
}: {
  header: ReactNode
  tabs: TabDef[]
  active: TabKey
  onTabChange: (key: TabKey) => void
  children: ReactNode
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
      {header}
      <main className="flex-1 px-4 pb-28 pt-4">{children}</main>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-lg border-t border-border bg-card/95 backdrop-blur"
      >
        <ul className="flex items-stretch justify-around px-1">
          {tabs.map((tab) => {
            const isActive = tab.key === active
            const Icon = tab.icon
            return (
              <li key={tab.key} className="flex-1">
                <button
                  type="button"
                  onClick={() => onTabChange(tab.key)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex w-full flex-col items-center gap-1 rounded-lg py-2.5 text-[0.65rem] font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className={cn('size-5', isActive && 'fill-primary/10')} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export function DashboardHeader({
  title,
  subtitle,
  right,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
}) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold leading-tight text-foreground">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  )
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-1 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-foreground">{children}</h2>
      {action}
    </div>
  )
}
