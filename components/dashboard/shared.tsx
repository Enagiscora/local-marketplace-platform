'use client'

import type { ReactNode } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Wallet as WalletIcon,
  Plus,
  Send,
  Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatNaira, type Transaction } from '@/lib/mock-data'

export function StatCard({
  label,
  value,
  icon,
  tone = 'default',
}: {
  label: string
  value: string
  icon?: ReactNode
  tone?: 'default' | 'primary' | 'gold'
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-3',
        tone === 'primary' && 'border-primary/30 bg-primary/5',
        tone === 'gold' && 'border-gold/40 bg-gold/10',
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {icon}
      </div>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  )
}

const statusStyles: Record<Transaction['status'], { label: string; variant: 'success' | 'warning' | 'secondary' | 'outline' }> = {
  completed: { label: 'Completed', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  'in-escrow': { label: 'In escrow', variant: 'warning' },
  refunded: { label: 'Refunded', variant: 'secondary' },
}

export function TransactionRow({ tx }: { tx: Transaction }) {
  const incoming = tx.type === 'sale' || tx.type === 'deposit'
  const status = statusStyles[tx.status]
  return (
    <li className="flex items-center gap-3 py-3">
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full',
          incoming ? 'bg-primary/12 text-primary' : 'bg-muted text-muted-foreground',
        )}
      >
        {incoming ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{tx.item}</p>
        <p className="truncate text-xs text-muted-foreground">
          {tx.counterparty !== 'Wallet' ? `@${tx.counterparty}` : 'Wallet'} · {tx.date}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={cn('text-sm font-semibold', incoming ? 'text-primary' : 'text-foreground')}>
          {incoming ? '+' : '-'}
          {formatNaira(tx.amount)}
        </span>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>
    </li>
  )
}

export function TransactionList({ items }: { items: Transaction[] }) {
  if (items.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No transactions yet.</p>
  }
  return (
    <ul className="divide-y divide-border">
      {items.map((tx) => (
        <TransactionRow key={tx.id} tx={tx} />
      ))}
    </ul>
  )
}

export function WalletPanel({
  wallet,
  role,
}: {
  wallet: { available: number; inEscrow: number; pendingPayout: number }
  role: 'buyer' | 'seller'
}) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground">
        <div className="flex items-center gap-2 text-sm opacity-90">
          <WalletIcon className="size-4" />
          Available balance
        </div>
        <p className="mt-1 text-3xl font-bold tracking-tight">{formatNaira(wallet.available)}</p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="secondary" className="flex-1 gap-1">
            <Plus className="size-4" />
            {role === 'buyer' ? 'Fund wallet' : 'Add funds'}
          </Button>
          <Button size="sm" variant="secondary" className="flex-1 gap-1">
            <Send className="size-4" />
            {role === 'buyer' ? 'Pay' : 'Withdraw'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Held in escrow"
          value={formatNaira(wallet.inEscrow)}
          tone="gold"
          icon={<ShieldCheck className="size-4 text-gold-foreground" />}
        />
        <StatCard
          label={role === 'seller' ? 'Pending payout' : 'Refunds due'}
          value={formatNaira(wallet.pendingPayout)}
        />
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-3">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Funds are held safely in <span className="font-medium text-foreground">escrow</span> until
          both parties confirm the transaction. This protects buyers and sellers from fraud.
        </p>
      </div>
    </div>
  )
}

export function RatingPill({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold-foreground">
      <Star className="size-3 fill-gold text-gold" />
      {rating.toFixed(1)}
    </span>
  )
}
