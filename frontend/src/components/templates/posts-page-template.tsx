'use client'

import { useCategories } from '@/hooks/use-categories'
import { usePosts } from '@/hooks/use-posts'
import { useSelectedCategory } from '@/hooks/use-selected-category'
import { useCategoryFilter } from '@/hooks/use-category-filter'
import CategorySidebar from '@/components/organisms/category-sidebar'
import PostList from '@/components/organisms/post-list'
import ErrorState from '@/components/atoms/error-state'

export default function PostsPageTemplate() {
  const { selectedCategoryId, selectCategory } = useSelectedCategory()
  const { categories, categoriesMap, isLoading: categoriesLoading, error, toggleFavorite } = useCategories()
  const { posts, isLoading: postsLoading } = usePosts(selectedCategoryId)
  const { filter, setFilter } = useCategoryFilter()

  const selectedCategoryName = selectedCategoryId
    ? categoriesMap[selectedCategoryId]?.name ?? null
    : null

  if (error) {
    return <ErrorState onRetry={() => window.location.reload()} />
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <CategorySidebar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        filter={filter}
        onFilterChange={setFilter}
        onSelectCategory={selectCategory}
        onToggleFavorite={toggleFavorite}
        isLoading={categoriesLoading}
      />
      <PostList
        posts={posts}
        categoryName={selectedCategoryName}
        selectedCategoryId={selectedCategoryId}
        categoriesMap={categoriesMap}
        onToggleFavorite={toggleFavorite}
        isLoading={postsLoading}
      />
    </div>
  )
}
