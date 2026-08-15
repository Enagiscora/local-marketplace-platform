import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  value,
  max = 5,
  className,
  size = 'md',
}: {
  value: number
  max?: number
  className?: string
  size?: 'sm' | 'md'
}) {
  const dim = size === 'sm' ? 'size-3.5' : 'size-5'
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            dim,
            i < Math.round(value) ? 'fill-gold text-gold' : 'fill-transparent text-muted-foreground/40',
          )}
        />
      ))}
    </div>
  )
}
