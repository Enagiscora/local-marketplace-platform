'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Loader2, Lock, Store, TriangleAlert, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StarRating } from '@/components/star-rating'
import { getLGAs } from '@/lib/nigeria-data'
import { useApp, maskContact } from '@/lib/store'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<string, string>>

export function SellerOnboarding({ onDone }: { onDone: () => void }) {
  const { currentUser, completeSellerOnboarding } = useApp()
  const fileRef = useRef<HTMLInputElement>(null)
  const state = currentUser?.state ?? ''

  const [image, setImage] = useState<string | null>(null)
  const [form, setForm] = useState({
    businessName: '',
    username: '',
    description: '',
    contactNumber: currentUser?.phone ?? '',
    lga: '',
    locality: '',
    area: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  function validate() {
    const next: Errors = {}
    if (!image) next.image = 'Add a product or service picture.'
    if (form.businessName.trim().length < 2) next.businessName = 'Enter your business name.'
    if (form.username.trim().length < 3) next.username = 'Username must be at least 3 characters.'
    if (form.description.trim().length < 10) next.description = 'Tell buyers a bit more (min. 10 characters).'
    if (form.contactNumber.replace(/\D/g, '').length < 10) next.contactNumber = 'Enter a valid contact number.'
    if (!form.lga) next.lga = 'Select your Local Government Area.'
    if (form.locality.trim().length < 2) next.locality = 'Enter your locality or city.'
    if (form.area.trim().length < 2) next.area = 'Enter your area.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const res = await completeSellerOnboarding({ ...form, productImage: image })
    setSubmitting(false)
    if (res.ok) onDone()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <Store className="size-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Seller setup</span>
        </div>
        <CardTitle className="text-2xl">Set up your shop</CardTitle>
        <CardDescription>
          This is how buyers around you will find and recognise your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          {/* Product / profile picture */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="seller-image">
              Product / service picture <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className={cn(
                  'relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors',
                  image ? 'border-transparent' : 'border-border bg-muted hover:bg-accent',
                )}
                aria-label="Upload product picture"
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image || '/placeholder.svg'} alt="Product preview" className="size-full object-cover" />
                ) : (
                  <ImagePlus className="size-6 text-muted-foreground" />
                )}
              </button>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Upload a clear photo</p>
                <p className="leading-relaxed">This also becomes your profile picture. JPG or PNG.</p>
                <input
                  ref={fileRef}
                  id="seller-image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImage}
                />
              </div>
            </div>
            {errors.image && <p className="text-xs font-medium text-destructive">{errors.image}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="businessName">
                Business name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="e.g. Ada's Fabrics"
                value={form.businessName}
                onChange={(e) => update('businessName', e.target.value)}
                aria-invalid={!!errors.businessName}
              />
              {errors.businessName && <p className="text-xs font-medium text-destructive">{errors.businessName}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="seller-username">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="seller-username"
                placeholder="e.g. adasfabrics"
                value={form.username}
                onChange={(e) => update('username', e.target.value.replace(/\s/g, '').toLowerCase())}
                aria-invalid={!!errors.username}
              />
              {errors.username && <p className="text-xs font-medium text-destructive">{errors.username}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">
              Business description <span className="text-destructive">*</span>
            </Label>
            <textarea
              id="description"
              rows={3}
              placeholder="What do you sell? What makes your shop special?"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              aria-invalid={!!errors.description}
              className={cn(
                'flex w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-base text-foreground shadow-xs outline-none transition-[color,box-shadow] resize-none leading-relaxed',
                'placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25',
                errors.description && 'border-destructive ring-destructive/20',
              )}
            />
            {errors.description && <p className="text-xs font-medium text-destructive">{errors.description}</p>}
          </div>

          {/* Contact with masking preview */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contactNumber">Contact number</Label>
            <Input
              id="contactNumber"
              type="tel"
              inputMode="tel"
              value={form.contactNumber}
              onChange={(e) => update('contactNumber', e.target.value)}
              aria-invalid={!!errors.contactNumber}
            />
            {errors.contactNumber ? (
              <p className="text-xs font-medium text-destructive">{errors.contactNumber}</p>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Info className="size-3.5 shrink-0" />
                Buyers see it masked as{' '}
                <span className="font-mono font-medium text-foreground">
                  {maskContact(form.contactNumber || '0000000000')}
                </span>{' '}
                to prevent spam.
              </div>
            )}
          </div>

          {/* Hierarchical location */}
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="mb-3 text-sm font-semibold">Where is your shop?</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="seller-state">State</Label>
                <div className="relative">
                  <Input id="seller-state" value={state} disabled className="pr-9" />
                  <Lock className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Locked from registration.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="seller-lga">
                  Local Government Area <span className="text-destructive">*</span>
                </Label>
                <Select
                  id="seller-lga"
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="seller-locality">
                    Locality / City <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="seller-locality"
                    placeholder="e.g. Yaba"
                    value={form.locality}
                    onChange={(e) => update('locality', e.target.value)}
                    aria-invalid={!!errors.locality}
                  />
                  {errors.locality && <p className="text-xs font-medium text-destructive">{errors.locality}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="seller-area">
                    Area <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="seller-area"
                    placeholder="e.g. Sabo Market"
                    value={form.area}
                    onChange={(e) => update('area', e.target.value)}
                    aria-invalid={!!errors.area}
                  />
                  {errors.area && <p className="text-xs font-medium text-destructive">{errors.area}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Trust system intro */}
          <div className="flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4">
            <div className="flex flex-col items-center gap-1">
              <StarRating value={5} />
              <span className="font-mono text-xs font-semibold text-gold-foreground">5 / 5 points</span>
            </div>
            <div className="border-l border-gold/40 pl-3">
              <p className="text-sm font-semibold text-gold-foreground">You start at a perfect score</p>
              <p className="text-xs leading-relaxed text-gold-foreground/90">
                Keep your rating high with fast replies and honest deals — top-rated sellers get
                recommended first in their locality.
              </p>
            </div>
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
              'Finish & enter my dashboard'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
