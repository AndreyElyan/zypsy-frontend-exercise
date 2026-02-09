import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded py-2 pr-4 pl-6 h-10 text-sm font-semibold leading-6',
        variant === 'primary'
          ? 'bg-primary text-primary-fg'
          : 'border-2 border-primary bg-surface text-primary',
        className,
      )}
    >
      {children}
    </span>
  )
}
