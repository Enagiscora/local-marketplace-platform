'use client'

/**
 * Client-side auth + onboarding store.
 *
 * This is intentionally isolated behind a small async API that mirrors a real
 * backend (sign up / log in / complete onboarding). When the database is
 * connected, swap the in-memory implementations below for Neon + Better Auth
 * calls (server actions) without changing any screen that consumes this hook.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type Role = 'buyer' | 'seller'

export type Account = {
  id: string
  email: string
  phone: string
  nin: string
  password: string
  role: Role
  state: string // locked after registration
  createdAt: number
  onboarded: boolean
}

export type SellerProfile = {
  productImage: string | null
  businessName: string
  username: string
  description: string
  contactNumber: string
  lga: string
  locality: string
  area: string
  trustStars: number
  trustPoints: number
}

export type BuyerProfile = {
  username: string
  preferredContact: string
  lga: string
  locality: string
  interests: string[]
}

export type SignUpInput = {
  email: string
  phone: string
  nin: string
  password: string
  role: Role
  state: string
}

type AuthResult = { ok: true } | { ok: false; error: string }

type AppState = {
  currentUser: Account | null
  sellerProfile: SellerProfile | null
  buyerProfile: BuyerProfile | null
  signUp: (input: SignUpInput) => Promise<AuthResult>
  logIn: (identifier: string, password: string) => Promise<AuthResult>
  logOut: () => void
  completeSellerOnboarding: (profile: Omit<SellerProfile, 'trustStars' | 'trustPoints'>) => Promise<AuthResult>
  completeBuyerOnboarding: (profile: BuyerProfile) => Promise<AuthResult>
}

const AppContext = createContext<AppState | null>(null)

function delay(ms = 550) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function AppProvider({ children }: { children: ReactNode }) {
  // In-memory "database" for the session. Replace with real persistence later.
  const accounts = useRef<Account[]>([])
  const sellerProfiles = useRef<Record<string, SellerProfile>>({})
  const buyerProfiles = useRef<Record<string, BuyerProfile>>({})

  const [currentUser, setCurrentUser] = useState<Account | null>(null)
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null)
  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile | null>(null)

  const signUp = useCallback<AppState['signUp']>(async (input) => {
    await delay()
    const email = input.email.trim().toLowerCase()
    if (accounts.current.some((a) => a.email === email)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    if (accounts.current.some((a) => a.nin === input.nin)) {
      return { ok: false, error: 'This NIN is already registered.' }
    }
    const account: Account = {
      id: crypto.randomUUID(),
      email,
      phone: input.phone.trim(),
      nin: input.nin.trim(),
      password: input.password,
      role: input.role,
      state: input.state,
      createdAt: Date.now(),
      onboarded: false,
    }
    accounts.current.push(account)
    setCurrentUser(account)
    return { ok: true }
  }, [])

  const logIn = useCallback<AppState['logIn']>(async (identifier, password) => {
    await delay()
    const id = identifier.trim().toLowerCase()
    const account = accounts.current.find(
      (a) => a.email === id || a.phone === identifier.trim(),
    )
    if (!account || account.password !== password) {
      return { ok: false, error: 'Invalid credentials. Please check and try again.' }
    }
    setCurrentUser(account)
    setSellerProfile(sellerProfiles.current[account.id] ?? null)
    setBuyerProfile(buyerProfiles.current[account.id] ?? null)
    return { ok: true }
  }, [])

  const logOut = useCallback(() => {
    setCurrentUser(null)
    setSellerProfile(null)
    setBuyerProfile(null)
  }, [])

  const completeSellerOnboarding = useCallback<AppState['completeSellerOnboarding']>(
    async (profile) => {
      await delay()
      if (!currentUser) return { ok: false, error: 'You must be signed in.' }
      const full: SellerProfile = { ...profile, trustStars: 5, trustPoints: 5 }
      sellerProfiles.current[currentUser.id] = full
      const updated = { ...currentUser, onboarded: true }
      const idx = accounts.current.findIndex((a) => a.id === currentUser.id)
      if (idx >= 0) accounts.current[idx] = updated
      setSellerProfile(full)
      setCurrentUser(updated)
      return { ok: true }
    },
    [currentUser],
  )

  const completeBuyerOnboarding = useCallback<AppState['completeBuyerOnboarding']>(
    async (profile) => {
      await delay()
      if (!currentUser) return { ok: false, error: 'You must be signed in.' }
      buyerProfiles.current[currentUser.id] = profile
      const updated = { ...currentUser, onboarded: true }
      const idx = accounts.current.findIndex((a) => a.id === currentUser.id)
      if (idx >= 0) accounts.current[idx] = updated
      setBuyerProfile(profile)
      setCurrentUser(updated)
      return { ok: true }
    },
    [currentUser],
  )

  const value = useMemo<AppState>(
    () => ({
      currentUser,
      sellerProfile,
      buyerProfile,
      signUp,
      logIn,
      logOut,
      completeSellerOnboarding,
      completeBuyerOnboarding,
    }),
    [
      currentUser,
      sellerProfile,
      buyerProfile,
      signUp,
      logIn,
      logOut,
      completeSellerOnboarding,
      completeBuyerOnboarding,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

/** Mask a phone number for public display, e.g. 0803****789 */
export function maskContact(value: string): string {
  const digits = value.replace(/\s+/g, '')
  if (digits.length <= 6) return '*'.repeat(digits.length)
  return `${digits.slice(0, 4)}****${digits.slice(-3)}`
}
