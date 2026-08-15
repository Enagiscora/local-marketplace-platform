import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

function Select({ className, children, ...props }: React.ComponentProps<'select'>) {
  return (
    <div className="relative w-full">
      <select
        data-slot="select"
        className={cn(
          'flex h-11 w-full appearance-none rounded-lg border border-input bg-card px-3.5 pr-10 py-2 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25',
          'disabled:pointer-events-none disabled:opacity-50 disabled:bg-muted',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
          'invalid:text-muted-foreground/70',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export { Select }
