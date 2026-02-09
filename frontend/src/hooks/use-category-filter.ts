'use client'

import { useState } from 'react'
import type { CategoryFilter } from '@/types'

export function useCategoryFilter() {
  const [filter, setFilter] = useState<CategoryFilter>('all')

  return { filter, setFilter }
}
