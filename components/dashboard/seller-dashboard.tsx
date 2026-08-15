'use client'

import { useMemo, useState } from 'react'
import {
  Sparkles,
  Search as SearchIcon,
  History as HistoryIcon,
  Wallet as WalletTab,
  User,
  TrendingUp,
  MapPin,
  LifeBuoy,
  Repeat,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useApp } from '@/lib/store'
import {
  DashboardShell,
  DashboardHeader,
  SectionTitle,
  type TabDef,
  type TabKey,
} from './dashboard-shell'
import { StatCard, TransactionList, WalletPanel, RatingPill } from './shared'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StarRating } from '@/components/star-rating'
import {
  PRODUCTS,
  SELLER_SALES,
  SELLER_REVIEWS,
  SELLER_WALLET,
  TRENDING_IN_AREA,
  formatNaira,
} from '@/lib/mock-data'
import { maskContact } from '@/lib/store'

const TABS: TabDef[] = [
  { key: 'suggestions', label: 'Suggestions', icon: Sparkles },
  { key: 'search', label: 'Search', icon: SearchIcon },
  { key: 'history', label: 'History', icon: HistoryIcon },
  { key: 'wallet', label: 'Wallet', icon: WalletTab },
  { key: 'profile', label: 'Profile', icon: User },
]

export function SellerDashboard({ onSwitchAccount }: { onSwitchAccount: () => void }) {
  const { currentUser, sellerProfile, logOut } = useApp()
  const [tab, setTab] = useState<TabKey>('suggestions')
  const [query, setQuery] = useState('')

  const locality = sellerProfile?.locality || 'your area'
  const state = currentUser?.state ?? 'Lagos'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PRODUCTS
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    )
  }, [query])

  const demanded = useMemo(() => [...PRODUCTS].sort((a, b) => b.demandScore - a.demandScore).slice(0, 4), [])

  return (
    <DashboardShell
      active={tab}
      onTabChange={setTab}
      tabs={TABS}
      header={
        <DashboardHeader
          title={sellerProfile?.businessName || 'Your store'}
          subtitle={`Seller · ${locality}, ${state}`}
          right={
            <Badge variant="gold" className="gap-1">
              <TrendingUp className="size-3" />
              {sellerProfile?.trustStars ?? 5}.0
            </Badge>
          }
        />
      }
    >
      {tab === 'suggestions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Demand score" value="High" tone="primary" icon={<TrendingUp className="size-4 text-primary" />} />
            <StatCard label="Views this week" value="1,284" />
          </div>

          <section>
            <SectionTitle>Trending in {locality}</SectionTitle>
            <ul className="space-y-2">
              {TRENDING_IN_AREA.map((t) => (
                <li
                  key={t.name}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.note}</p>
                  </div>
                  <Badge variant="success">{t.change}</Badge>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionTitle>Most demanded near you</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              {demanded.map((p) => (
                <div key={p.id} className="rounded-xl border border-border bg-card p-3">
                  <p className="text-sm font-medium leading-tight text-foreground">{p.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">{p.demandScore}% demand</span>
                    <RatingPill rating={p.rating} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === 'search' && (
        <div className="space-y-4">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or categories..."
              className="pl-9"
              aria-label="Search products"
            />
          </div>
          <p className="text-xs text-muted-foreground">{filtered.length} result(s)</p>
          <ul className="space-y-2">
            {filtered.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {p.locality} · {p.category}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-foreground">{formatNaira(p.price)}</span>
                  <RatingPill rating={p.rating} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Total sales" value={formatNaira(63000)} tone="primary" />
            <StatCard label="Orders" value="12" />
          </div>
          <SectionTitle>Sales history</SectionTitle>
          <TransactionList items={SELLER_SALES} />
        </div>
      )}

      {tab === 'wallet' && <WalletPanel wallet={SELLER_WALLET} role="seller" />}

      {tab === 'profile' && (
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sellerProfile?.productImage || '/placeholder.svg?height=64&width=64&query=store'}
              alt=""
              className="size-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">
                {sellerProfile?.businessName}
              </p>
              <p className="truncate text-sm text-muted-foreground">@{sellerProfile?.username}</p>
              <p className="text-xs text-muted-foreground">
                Contact: {maskContact(sellerProfile?.contactNumber || currentUser?.phone || '')}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Trust rating</p>
                <p className="text-xs text-muted-foreground">Keep it high to stay recommended</p>
              </div>
              <div className="text-right">
                <StarRating value={sellerProfile?.trustStars ?? 5} readOnly size={16} />
                <p className="mt-1 text-xs font-semibold text-gold-foreground">
                  {sellerProfile?.trustPoints ?? 5} / 5 points
                </p>
              </div>
            </div>
          </div>

          <section>
            <SectionTitle>Reviews</SectionTitle>
            <ul className="space-y-2">
              {SELLER_REVIEWS.map((r) => (
                <li key={r.id} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">@{r.author}</p>
                    <StarRating value={r.rating} readOnly size={12} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-1">
            <SettingsRow icon={LifeBuoy} label="Support & customer service" />
            <SettingsRow icon={Repeat} label="Switch account" onClick={onSwitchAccount} />
            <SettingsRow icon={LogOut} label="Log out" destructive onClick={logOut} />
          </section>
        </div>
      )}
    </DashboardShell>
  )
}

function SettingsRow({
  icon: Icon,
  label,
  onClick,
  destructive,
}: {
  icon: typeof LifeBuoy
  label: string
  onClick?: () => void
  destructive?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:bg-secondary/60"
    >
      <Icon className={destructive ? 'size-4 text-destructive' : 'size-4 text-muted-foreground'} />
      <span className={destructive ? 'flex-1 text-sm font-medium text-destructive' : 'flex-1 text-sm font-medium text-foreground'}>
        {label}
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  )
}
