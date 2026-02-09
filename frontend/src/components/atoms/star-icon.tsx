'use client'

import { cn } from '@/lib/utils'

interface StarIconProps {
  filled: boolean
  onClick?: (e: React.MouseEvent) => void
  size?: 'sm' | 'md'
  className?: string
}

export default function StarIcon({ filled, onClick, size = 'md', className }: StarIconProps) {
  const sizeClasses = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick?.(e)
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(
        sizeClasses,
        'shrink-0 transition-colors',
        filled ? 'fill-star-gold text-star-gold' : 'fill-transparent text-current stroke-current',
        onClick && 'cursor-pointer',
        className,
      )}
      strokeWidth={filled ? 0 : 1.5}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={filled ? 'Remove from favorites' : 'Add to favorites'}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
