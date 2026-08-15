import { Store } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Brand({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'inverse'
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'inline-flex size-9 items-center justify-center rounded-xl',
          variant === 'inverse'
            ? 'bg-primary-foreground text-primary'
            : 'bg-primary text-primary-foreground',
        )}
      >
        <Store className="size-5" />
      </span>
      <span
        className={cn(
          'text-lg font-bold tracking-tight',
          variant === 'inverse' ? 'text-primary-foreground' : 'text-foreground',
        )}
      >
        Naija<span className="text-gold">Market</span>
      </span>
    </div>
  )
}
