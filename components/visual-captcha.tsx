'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'

// Ambiguous characters (0/O, 1/I/l) removed for readability.
const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

function randomCode(length = 5) {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return code
}

function cssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export function VisualCaptcha({
  onChange,
}: {
  // Reports the current code so the parent can validate the typed answer.
  onChange: (code: string) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [code, setCode] = useState('')

  const draw = useCallback((value: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = 220
    const height = 72
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const primary = cssVar('--primary', 'oklch(0.52 0.12 162)')
    const gold = cssVar('--gold', 'oklch(0.79 0.14 78)')
    const foreground = cssVar('--foreground', '#1a1a1a')

    // Background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // Noise dots
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = i % 2 === 0 ? primary : gold
      ctx.globalAlpha = 0.18
      ctx.beginPath()
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.6, 0, Math.PI * 2)
      ctx.fill()
    }

    // Interference lines
    ctx.globalAlpha = 0.35
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = i % 2 === 0 ? primary : gold
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(0, Math.random() * height)
      ctx.bezierCurveTo(
        width * 0.3,
        Math.random() * height,
        width * 0.6,
        Math.random() * height,
        width,
        Math.random() * height,
      )
      ctx.stroke()
    }

    // Characters with jitter + rotation
    ctx.globalAlpha = 1
    ctx.textBaseline = 'middle'
    const step = width / (value.length + 1)
    for (let i = 0; i < value.length; i++) {
      const x = step * (i + 1)
      const y = height / 2 + (Math.random() * 10 - 5)
      const angle = (Math.random() * 40 - 20) * (Math.PI / 180)
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.font = `bold ${26 + Math.random() * 8}px var(--font-jakarta), system-ui, sans-serif`
      ctx.fillStyle = i % 2 === 0 ? foreground : primary
      ctx.fillText(value[i], -10, 0)
      ctx.restore()
    }
  }, [])

  const regenerate = useCallback(() => {
    const next = randomCode()
    setCode(next)
    onChange(next)
    draw(next)
  }, [draw, onChange])

  useEffect(() => {
    regenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex items-center gap-3">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="CAPTCHA image. Type the characters you see in the field."
        className="rounded-lg border border-border bg-white"
      />
      <button
        type="button"
        onClick={regenerate}
        aria-label="Generate a new CAPTCHA"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <RefreshCw className="size-4" />
      </button>
    </div>
  )
}
