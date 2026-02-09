'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import type { Category } from '@/types'
import { fetchCategories, updateCategory } from '@/lib/api'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const categoriesRef = useRef(categories)
  categoriesRef.current = categories

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  const categoriesMap = useMemo(
    () =>
      categories.reduce<Record<string, Category>>((acc, category) => {
        acc[category.id] = category
        return acc
      }, {}),
    [categories],
  )

  const toggleFavorite = useCallback(async (category: Category) => {
    const snapshot = categoriesRef.current

    setCategories((prev) =>
      prev.map((c) => (c.id === category.id ? { ...c, favorite: !c.favorite } : c)),
    )

    try {
      await updateCategory(category.id, {
        name: category.name,
        favorite: !category.favorite,
      })
    } catch {
      setCategories(snapshot)
    }
  }, [])

  return { categories, categoriesMap, isLoading, error, toggleFavorite }
}
