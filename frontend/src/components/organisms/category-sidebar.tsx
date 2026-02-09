'use client'

import type { Category, CategoryFilter } from '@/types'
import FilterTabs from '@/components/molecules/filter-tabs'
import CategoryButton from '@/components/molecules/category-button'

interface CategorySidebarProps {
  categories: Category[]
  selectedCategoryId: string | null
  filter: CategoryFilter
  onFilterChange: (filter: CategoryFilter) => void
  onSelectCategory: (id: string) => void
  onToggleFavorite: (category: Category) => void
  isLoading: boolean
}

export default function CategorySidebar({
  categories,
  selectedCategoryId,
  filter,
  onFilterChange,
  onSelectCategory,
  onToggleFavorite,
  isLoading,
}: CategorySidebarProps) {
  const filteredCategories =
    filter === 'favorites' ? categories.filter((c) => c.favorite) : categories

  return (
    <aside className="w-full md:w-55 shrink-0 flex flex-col max-h-[50vh] md:max-h-none md:h-screen border-b md:border-b-0 md:border-r border-divider overflow-y-auto md:overflow-y-visible">
      <div className="bg-olive-800 px-4 py-3">
        <h1 className="text-white font-bold text-lg">Posts</h1>
      </div>

      <FilterTabs activeFilter={filter} onFilterChange={onFilterChange} />

      <div className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden flex-1">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 shrink-0 w-24 md:w-auto rounded-full bg-gray-200 animate-pulse"
              />
            ))}
          </>
        ) : (
          filteredCategories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={category.id === selectedCategoryId}
              onSelect={onSelectCategory}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        )}

        {!isLoading && filter === 'favorites' && filteredCategories.length === 0 && (
          <p className="text-sm text-gray-400 px-2">No favorite categories yet</p>
        )}
      </div>
    </aside>
  )
}
