'use client'

import type { Category } from '@/types'
import Badge from '@/components/atoms/badge'
import StarIcon from '@/components/atoms/star-icon'

interface CategoryTagProps {
  category: Category
  isSelected?: boolean
  onToggleFavorite: (category: Category) => void
}

export default function CategoryTag({ category, isSelected, onToggleFavorite }: CategoryTagProps) {
  return (
    <Badge variant={isSelected ? 'secondary' : 'primary'}>
      {category.name}
      <StarIcon
        filled={category.favorite}
        onClick={() => onToggleFavorite(category)}
        size="sm"
      />
    </Badge>
  )
}
