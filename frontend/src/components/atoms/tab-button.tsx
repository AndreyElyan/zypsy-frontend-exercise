'use client'

import { cn } from '@/lib/utils'

interface TabButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

export default function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-foreground"
    >
      <span
        className={cn(
          'flex items-center justify-center w-4.5 h-4.5 shrink-0 rounded-full border-2 transition-colors',
          active
            ? 'border-primary'
            : 'border-accent',
        )}
      >
        {active && (
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        )}
      </span>
      {label}
    </button>
  )
}
