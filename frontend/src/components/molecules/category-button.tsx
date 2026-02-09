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
        'flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-olive-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-olive-700',
        isSelected && 'ring-2 ring-olive-600 ring-offset-2',
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
