import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'gold'
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-border text-foreground',
  success: 'bg-primary/12 text-primary',
  warning: 'bg-gold/20 text-gold-foreground',
  gold: 'bg-gold text-gold-foreground',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
