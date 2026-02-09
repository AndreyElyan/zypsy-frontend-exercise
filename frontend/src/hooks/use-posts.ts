'use client'

import { useState, useEffect } from 'react'
import type { Post } from '@/types'
import { fetchCategoryPosts } from '@/lib/api'

export function usePosts(categoryId: string | null) {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!categoryId) {
      setPosts([])
      return
    }

    const controller = new AbortController()
    setIsLoading(true)
    setError(null)

    fetchCategoryPosts(categoryId, controller.signal)
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        setPosts(sorted)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [categoryId])

  return { posts, isLoading, error }
}
