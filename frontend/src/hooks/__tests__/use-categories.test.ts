import { describe, test, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useCategories } from '../use-categories'
import { fetchCategories, updateCategory } from '@/lib/api'
import type { Category } from '@/types'

vi.mock('@/lib/api')

const mockCategories: Category[] = [
  { id: '1', name: 'Tech', favorite: false },
  { id: '2', name: 'Science', favorite: true },
]

beforeEach(() => {
  vi.mocked(fetchCategories).mockResolvedValue(mockCategories)
  vi.mocked(updateCategory).mockResolvedValue(mockCategories[0])
})

describe('useCategories', () => {
  test('initializes with loading state', () => {
    const { result } = renderHook(() => useCategories())
    expect(result.current.isLoading).toBe(true)
    expect(result.current.categories).toEqual([])
    expect(result.current.error).toBeNull()
  })

  test('fetches categories on mount', async () => {
    const { result } = renderHook(() => useCategories())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.categories).toEqual(mockCategories)
  })

  test('sets error when fetch fails', async () => {
    vi.mocked(fetchCategories).mockRejectedValue(new Error('fail'))
    const { result } = renderHook(() => useCategories())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.error).toBe('fail')
  })

  test('builds categoriesMap from categories', async () => {
    const { result } = renderHook(() => useCategories())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.categoriesMap).toEqual({
      '1': mockCategories[0],
      '2': mockCategories[1],
    })
  })

  test('toggleFavorite optimistically updates category', async () => {
    const { result } = renderHook(() => useCategories())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    vi.mocked(updateCategory).mockResolvedValue({ ...mockCategories[0], favorite: true })
    await act(async () => {
      await result.current.toggleFavorite(mockCategories[0])
    })

    expect(result.current.categories[0].favorite).toBe(true)
  })

  test('toggleFavorite calls updateCategory with correct args', async () => {
    const { result } = renderHook(() => useCategories())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.toggleFavorite(mockCategories[0])
    })

    expect(updateCategory).toHaveBeenCalledWith('1', { name: 'Tech', favorite: true })
  })

  test('toggleFavorite rolls back on API failure', async () => {
    const { result } = renderHook(() => useCategories())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    vi.mocked(updateCategory).mockRejectedValue(new Error('fail'))
    await act(async () => {
      await result.current.toggleFavorite(mockCategories[0])
    })

    expect(result.current.categories[0].favorite).toBe(false)
  })

  test('toggleFavorite keeps optimistic update on success', async () => {
    const { result } = renderHook(() => useCategories())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    vi.mocked(updateCategory).mockResolvedValue({ ...mockCategories[1], favorite: false })
    await act(async () => {
      await result.current.toggleFavorite(mockCategories[1])
    })

    expect(result.current.categories[1].favorite).toBe(false)
  })
})
