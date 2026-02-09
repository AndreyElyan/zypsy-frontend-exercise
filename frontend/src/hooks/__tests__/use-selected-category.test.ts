import { describe, test, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSelectedCategory } from '../use-selected-category'

const mockPush = vi.fn()
let mockSearchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/',
}))

beforeEach(() => {
  mockSearchParams = new URLSearchParams()
  mockPush.mockClear()
})

describe('useSelectedCategory', () => {
  test('returns null when no category param', () => {
    const { result } = renderHook(() => useSelectedCategory())
    expect(result.current.selectedCategoryId).toBeNull()
  })

  test('returns category id from URL params', () => {
    mockSearchParams = new URLSearchParams('category=abc')
    const { result } = renderHook(() => useSelectedCategory())
    expect(result.current.selectedCategoryId).toBe('abc')
  })

  test('selectCategory pushes URL with category param', () => {
    const { result } = renderHook(() => useSelectedCategory())
    act(() => result.current.selectCategory('xyz'))
    expect(mockPush).toHaveBeenCalledWith('/?category=xyz')
  })

  test('selectCategory preserves existing params', () => {
    mockSearchParams = new URLSearchParams('other=1')
    const { result } = renderHook(() => useSelectedCategory())
    act(() => result.current.selectCategory('xyz'))
    expect(mockPush).toHaveBeenCalledWith('/?other=1&category=xyz')
  })
})
