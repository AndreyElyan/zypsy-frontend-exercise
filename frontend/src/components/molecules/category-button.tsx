'use client'

import type { Category } from '@/types'
import StarIcon from '@/components/atoms/star-icon'
import { cn } from '@/lib/utils'

interface CategoryButtonProps {
  category: Category
  isSelected: boolean
  onSelect: (id: string) => void
  onToggleFavorite: (category: Category) => void
}

export default function CategoryButton({
  category,
  isSelected,
  onSelect,
  onToggleFavorite,
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      className={cn(
        'flex shrink-0 items-center gap-2 whitespace-nowrap rounded border-2 py-2 pr-4 pl-6 h-10 text-sm font-semibold leading-6 cursor-pointer transition-all',
        isSelected
          ? 'border-primary bg-surface text-primary'
          : 'border-primary bg-primary text-primary-fg hover:bg-primary/90 hover:border-primary/90',
      )}
    >
      {category.name}
      <StarIcon
        filled={category.favorite}
        onClick={() => onToggleFavorite(category)}
        size="md"
      />
    </button>
  )
}
