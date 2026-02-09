import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-olive-800 px-3 py-1.5 text-xs font-medium text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}
