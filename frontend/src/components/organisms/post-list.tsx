'use client'

import type { Post, Category } from '@/types'
import PostCard from '@/components/organisms/post-card'
import Divider from '@/components/atoms/divider'

interface PostListProps {
  posts: Post[]
  categoryName: string | null
  categoriesMap: Record<string, Category>
  onToggleFavorite: (category: Category) => void
  isLoading: boolean
}

export default function PostList({
  posts,
  categoryName,
  categoriesMap,
  onToggleFavorite,
  isLoading,
}: PostListProps) {
  if (!categoryName && !isLoading) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center text-gray-400">
        <p>Select a category to view posts</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 min-h-0 p-4 md:p-6">
        <div className="h-5 w-64 bg-gray-200 rounded animate-pulse mb-6" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mb-6">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="space-y-2 mb-3">
              <div className="h-4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-7 w-24 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-7 w-28 bg-gray-200 rounded-full animate-pulse" />
            </div>
            {i < 2 && <Divider className="mt-4" />}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-0 p-4 md:p-6 overflow-y-auto">
      <p className="text-sm text-gray-600 mb-2">
        Found {posts.length} posts of &apos;{categoryName}&apos;
      </p>

      {posts.map((post, index) => (
        <div key={post.id}>
          <PostCard
            post={post}
            categoriesMap={categoriesMap}
            onToggleFavorite={onToggleFavorite}
          />
          {index < posts.length - 1 && <Divider />}
        </div>
      ))}

      {posts.length === 0 && (
        <p className="text-gray-400 mt-8">No posts found for this category</p>
      )}
    </div>
  )
}
