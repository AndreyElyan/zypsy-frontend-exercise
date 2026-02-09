'use client'

import type { Post, Category } from '@/types'
import { formatPostDate } from '@/lib/utils'
import CategoryTag from '@/components/molecules/category-tag'

interface PostCardProps {
  post: Post
  categoriesMap: Record<string, Category>
  onToggleFavorite: (category: Category) => void
}

export default function PostCard({ post, categoriesMap, onToggleFavorite }: PostCardProps) {
  return (
    <article className="py-4">
      <h3 className="font-bold text-base text-gray-900 mb-2">{formatPostDate(post.date)}</h3>
      <p className="text-sm text-gray-700 leading-relaxed mb-3">{post.description}</p>
      <div className="flex flex-wrap gap-2">
        {post.categories
          .map((catId) => categoriesMap[catId])
          .filter(Boolean)
          .map((category) => (
            <CategoryTag
              key={category.id}
              category={category}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
      </div>
    </article>
  )
}
