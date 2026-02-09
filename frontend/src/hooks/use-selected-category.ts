'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export function useSelectedCategory() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const selectedCategoryId = searchParams.get('category')

  const selectCategory = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('category', id)
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname],
  )

  return { selectedCategoryId, selectCategory }
}
