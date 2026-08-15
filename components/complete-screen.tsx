'use client'

import { CheckCircle2, LogOut, MapPin, ShoppingBag, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StarRating } from '@/components/star-rating'
import { useApp, maskContact } from '@/lib/store'

export function CompleteScreen({ onLogout }: { onLogout: () => void }) {
  const { currentUser, sellerProfile, buyerProfile } = useApp()
  if (!currentUser) return null
  const isSeller = currentUser.role === 'seller'

  return (
    <Card>
      <CardHeader>
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-6" />
        </div>
        <CardTitle className="mt-2 text-2xl">You&apos;re all set!</CardTitle>
        <CardDescription>
          Your {isSeller ? 'shop' : 'buyer'} account is ready. Your dashboard is the next thing
          we&apos;ll build — here&apos;s a summary of what you created.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4">
          <span className="inline-flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            {isSeller ? <Store className="size-5" /> : <ShoppingBag className="size-5" />}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">
              @{isSeller ? sellerProfile?.username : buyerProfile?.username}
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {isSeller ? sellerProfile?.locality : buyerProfile?.locality}, {currentUser.state}
            </p>
          </div>
          <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold capitalize text-primary">
            {currentUser.role}
          </span>
        </div>

        {isSeller && sellerProfile && (
          <div className="flex items-center justify-between rounded-xl border border-gold/40 bg-gold/10 p-4">
            <div>
              <p className="text-sm font-semibold text-gold-foreground">Starting trust score</p>
              <p className="font-mono text-xs text-gold-foreground/80">
                {sellerProfile.trustPoints} / 5 points · contact {maskContact(sellerProfile.contactNumber)}
              </p>
            </div>
            <StarRating value={sellerProfile.trustStars} />
          </div>
        )}

        {!isSeller && buyerProfile && (
          <div className="rounded-xl border border-border p-4">
            <p className="mb-2 text-sm font-semibold">Your interests</p>
            <div className="flex flex-wrap gap-1.5">
              {buyerProfile.interests.map((i) => (
                <span key={i} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {i}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button variant="outline" className="h-10 w-full" onClick={onLogout}>
          <LogOut className="size-4" /> Log out
        </Button>
      </CardContent>
    </Card>
  )
}
