'use client'

import { useState } from 'react'
import { Check, Loader2, Lock, ShoppingBag, Sparkles, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { getLGAs, INTEREST_CATEGORIES } from '@/lib/nigeria-data'
import { useApp } from '@/lib/store'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<string, string>>

export function BuyerOnboarding({ onDone }: { onDone: () => void }) {
  const { currentUser, completeBuyerOnboarding } = useApp()
  const state = currentUser?.state ?? ''

  const [form, setForm] = useState({
    username: '',
    preferredContact: currentUser?.phone ?? '',
    lga: '',
    locality: '',
  })
  const [interests, setInterests] = useState<string[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function toggleInterest(cat: string) {
    setInterests((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
    setErrors((e) => ({ ...e, interests: undefined }))
  }

  function validate() {
    const next: Errors = {}
    if (form.username.trim().length < 3) next.username = 'Username must be at least 3 characters.'
    if (form.preferredContact.trim().length < 5) next.preferredContact = 'Enter a phone or email buyers can reach you on.'
    if (!form.lga) next.lga = 'Select your Local Government Area.'
    if (form.locality.trim().length < 2) next.locality = 'Enter your locality or city.'
    if (interests.length < 3) next.interests = 'Pick at least 3 interests to personalise your feed.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const res = await completeBuyerOnboarding({ ...form, interests })
    setSubmitting(false)
    if (res.ok) onDone()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <ShoppingBag className="size-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Buyer setup</span>
        </div>
        <CardTitle className="text-2xl">Personalise your market</CardTitle>
        <CardDescription>
          Tell us what you love so we can surface the best local sellers for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="buyer-username">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="buyer-username"
                placeholder="e.g. tunde_ng"
                value={form.username}
                onChange={(e) => update('username', e.target.value.replace(/\s/g, '').toLowerCase())}
                aria-invalid={!!errors.username}
              />
              {errors.username && <p className="text-xs font-medium text-destructive">{errors.username}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="preferredContact">
                Preferred contact <span className="text-destructive">*</span>
              </Label>
              <Input
                id="preferredContact"
                placeholder="Phone or email"
                value={form.preferredContact}
                onChange={(e) => update('preferredContact', e.target.value)}
                aria-invalid={!!errors.preferredContact}
              />
              {errors.preferredContact && (
                <p className="text-xs font-medium text-destructive">{errors.preferredContact}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="mb-3 text-sm font-semibold">Where do you shop from?</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="buyer-state">State</Label>
                <div className="relative">
                  <Input id="buyer-state" value={state} disabled className="pr-9" />
                  <Lock className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Locked from registration.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="buyer-lga">
                    Local Government Area <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    id="buyer-lga"
                    value={form.lga}
                    onChange={(e) => update('lga', e.target.value)}
                    aria-invalid={!!errors.lga}
                    className={cn(!form.lga && 'text-muted-foreground/70')}
                  >
                    <option value="" disabled>
                      Select LGA
                    </option>
                    {getLGAs(state).map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </Select>
                  {errors.lga && <p className="text-xs font-medium text-destructive">{errors.lga}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="buyer-locality">
                    Locality / City <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="buyer-locality"
                    placeholder="e.g. Ikeja GRA"
                    value={form.locality}
                    onChange={(e) => update('locality', e.target.value)}
                    aria-invalid={!!errors.locality}
                  />
                  {errors.locality && <p className="text-xs font-medium text-destructive">{errors.locality}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1.5">
                <Sparkles className="size-4 text-gold-foreground" />
                What are you interested in?
              </Label>
              <span className="text-xs text-muted-foreground">{interests.length} selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {INTEREST_CATEGORIES.map((cat) => {
                const active = interests.includes(cat)
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleInterest(cat)}
                    aria-pressed={active}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                      active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-foreground hover:bg-muted',
                    )}
                  >
                    {active && <Check className="size-3.5" />}
                    {cat}
                  </button>
                )
              })}
            </div>
            {errors.interests && <p className="text-xs font-medium text-destructive">{errors.interests}</p>}
          </div>

          {!currentUser && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              <TriangleAlert className="size-4 shrink-0" />
              Session expired. Please sign in again.
            </div>
          )}

          <Button type="submit" size="lg" className="h-11 w-full text-sm" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Finishing setup…
              </>
            ) : (
              'Finish & explore the market'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
