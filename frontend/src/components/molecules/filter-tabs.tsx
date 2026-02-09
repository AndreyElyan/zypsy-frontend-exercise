'use client'

import type { CategoryFilter } from '@/types'
import TabButton from '@/components/atoms/tab-button'

interface FilterTabsProps {
  activeFilter: CategoryFilter
  onFilterChange: (filter: CategoryFilter) => void
}

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex gap-4 px-4 pt-3 pb-2 border-b border-divider">
      <TabButton
        label="All categories"
        active={activeFilter === 'all'}
        onClick={() => onFilterChange('all')}
      />
      <TabButton
        label="Favorite categories"
        active={activeFilter === 'favorites'}
        onClick={() => onFilterChange('favorites')}
      />
    </div>
  )
}
