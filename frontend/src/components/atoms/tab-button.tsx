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
      className={cn(
        'pb-2 text-sm font-medium transition-colors border-b-2',
        active
          ? 'text-olive-800 border-olive-800'
          : 'text-gray-400 border-transparent hover:text-gray-600',
      )}
    >
      {label}
    </button>
  )
}
