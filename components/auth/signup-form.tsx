'use client'

import { useRef, useState } from 'react'
import { Eye, EyeOff, Loader2, Lock, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { VisualCaptcha } from '@/components/visual-captcha'
import { STATES } from '@/lib/nigeria-data'
import { useApp, type Role } from '@/lib/store'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<string, string>>

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  hint,
}: {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}

export function SignUpForm({
  onSuccess,
  onSwitchToLogin,
}: {
  onSuccess: (role: Role) => void
  onSwitchToLogin: () => void
}) {
  const { signUp } = useApp()
  const captchaCode = useRef('')

  const [form, setForm] = useState({
    email: '',
    phone: '',
    nin: '',
    password: '',
    confirm: '',
    role: '' as '' | Role,
    state: '',
    captcha: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const next: Errors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (phoneDigits.length < 10 || phoneDigits.length > 14)
      next.phone = 'Enter a valid phone number.'
    if (!/^\d{11}$/.test(form.nin.trim())) next.nin = 'NIN must be exactly 11 digits.'
    if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    if (!form.role) next.role = 'Choose whether you want to buy or sell.'
    if (!form.state) next.state = 'Select your state.'
    if (form.captcha.trim().toUpperCase() !== captchaCode.current.toUpperCase())
      next.captcha = 'The characters do not match the image.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    if (!validate()) return
    setSubmitting(true)
    const res = await signUp({
      email: form.email,
      phone: form.phone,
      nin: form.nin,
      password: form.password,
      role: form.role as Role,
      state: form.state,
    })
    setSubmitting(false)
    if (res.ok) {
      onSuccess(form.role as Role)
    } else {
      setFormError(res.error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Join your local market. Verified with your National ID for a safer community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Field label="Email address" htmlFor="email" error={errors.email} required>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={!!errors.email}
            />
          </Field>

          <Field label="Phone number" htmlFor="phone" error={errors.phone} required>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0803 000 0000"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              aria-invalid={!!errors.phone}
            />
          </Field>

          <Field
            label="National Identification Number (NIN)"
            htmlFor="nin"
            error={errors.nin}
            hint="Your 11-digit NIN. Used only for verification."
            required
          >
            <Input
              id="nin"
              inputMode="numeric"
              maxLength={11}
              placeholder="12345678901"
              value={form.nin}
              onChange={(e) => update('nin', e.target.value.replace(/\D/g, ''))}
              aria-invalid={!!errors.nin}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Password" htmlFor="password" error={errors.password} required>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="pr-10"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  aria-invalid={!!errors.password}
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
            </Field>

            <Field label="Confirm password" htmlFor="confirm" error={errors.confirm} required>
              <Input
                id="confirm"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={(e) => update('confirm', e.target.value)}
                aria-invalid={!!errors.confirm}
              />
            </Field>
          </div>

          <Field label="I want to" htmlFor="role" error={errors.role} required>
            <Select
              id="role"
              value={form.role}
              onChange={(e) => update('role', e.target.value as Role)}
              aria-invalid={!!errors.role}
              className={cn(!form.role && 'text-muted-foreground/70')}
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="buyer">Buy — discover and purchase from local sellers</option>
              <option value="seller">Sell — list products and reach nearby buyers</option>
            </Select>
          </Field>

          <Field label="State" htmlFor="state" error={errors.state} required>
            <Select
              id="state"
              value={form.state}
              onChange={(e) => update('state', e.target.value)}
              aria-invalid={!!errors.state}
              className={cn(!form.state && 'text-muted-foreground/70')}
            >
              <option value="" disabled>
                Select your state
              </option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <div className="mt-1 flex items-start gap-2 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-gold-foreground" />
              <p className="text-xs leading-relaxed text-gold-foreground">
                Your state is permanent. It <strong>cannot be changed</strong> after registration,
                so please choose carefully.
              </p>
            </div>
          </Field>

          <Field
            label="Security check"
            htmlFor="captcha"
            error={errors.captcha}
            hint="Type the characters shown in the image."
            required
          >
            <VisualCaptcha onChange={(code) => (captchaCode.current = code)} />
            <Input
              id="captcha"
              autoComplete="off"
              autoCapitalize="characters"
              placeholder="Enter the characters"
              className="mt-2 uppercase tracking-widest"
              value={form.captcha}
              onChange={(e) => update('captcha', e.target.value)}
              aria-invalid={!!errors.captcha}
            />
          </Field>

          {formError && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              <TriangleAlert className="size-4 shrink-0" />
              {formError}
            </div>
          )}

          <Button type="submit" size="lg" className="mt-1 h-11 w-full text-sm" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Creating account…
              </>
            ) : (
              <>
                <Lock className="size-4" /> Create account
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
