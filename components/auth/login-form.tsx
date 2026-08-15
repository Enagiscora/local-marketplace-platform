'use client'

import { useState } from 'react'
import { Eye, EyeOff, Loader2, LogIn, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useApp } from '@/lib/store'

export function LoginForm({
  onSuccess,
  onSwitchToSignUp,
}: {
  onSuccess: () => void
  onSwitchToSignUp: () => void
}) {
  const { logIn } = useApp()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!identifier.trim() || !password) {
      setError('Enter your email/phone and password.')
      return
    }
    setSubmitting(true)
    const res = await logIn(identifier, password)
    setSubmitting(false)
    if (res.ok) onSuccess()
    else setError(res.error)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Log in to pick up where you left off.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="identifier">Email or phone</Label>
            <Input
              id="identifier"
              autoComplete="username"
              placeholder="you@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Your password"
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              <TriangleAlert className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" size="lg" className="h-11 w-full text-sm" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Logging in…
              </>
            ) : (
              <>
                <LogIn className="size-4" /> Log in
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            New to NaijaMarket?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="font-semibold text-primary hover:underline"
            >
              Create an account
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
