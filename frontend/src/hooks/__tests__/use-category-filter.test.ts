import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCategoryFilter } from '../use-category-filter'

describe('useCategoryFilter', () => {
  test('initializes with filter set to all', () => {
    const { result } = renderHook(() => useCategoryFilter())
    expect(result.current.filter).toBe('all')
  })

  test('updates filter when setFilter is called', () => {
    const { result } = renderHook(() => useCategoryFilter())
    act(() => result.current.setFilter('favorites'))
    expect(result.current.filter).toBe('favorites')
  })
})
