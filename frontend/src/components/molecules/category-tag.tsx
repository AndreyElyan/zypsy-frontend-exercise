'use client'

import type { Category } from '@/types'
import Badge from '@/components/atoms/badge'
import StarIcon from '@/components/atoms/star-icon'

interface CategoryTagProps {
  category: Category
  onToggleFavorite: (category: Category) => void
}

export default function CategoryTag({ category, onToggleFavorite }: CategoryTagProps) {
  return (
    <Badge>
      {category.name}
      <StarIcon
        filled={category.favorite}
        onClick={() => onToggleFavorite(category)}
        size="sm"
      />
    </Badge>
  )
}
