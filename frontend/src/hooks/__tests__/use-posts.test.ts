import { describe, test, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePosts } from '../use-posts'
import { fetchCategoryPosts } from '@/lib/api'
import type { Post } from '@/types'

vi.mock('@/lib/api')

const mockPosts: Post[] = [
  { id: 'p1', description: 'Older', date: '2024-01-01', categories: ['1'] },
  { id: 'p2', description: 'Newer', date: '2024-05-01', categories: ['1'] },
]

beforeEach(() => {
  vi.mocked(fetchCategoryPosts).mockResolvedValue(mockPosts)
})

describe('usePosts', () => {
  test('returns empty posts when categoryId is null', () => {
    const { result } = renderHook(() => usePosts(null))
    expect(result.current.posts).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  test('fetches and sorts posts by date descending', async () => {
    const { result } = renderHook(() => usePosts('1'))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.posts[0].id).toBe('p2')
    expect(result.current.posts[1].id).toBe('p1')
  })

  test('sets isLoading true while fetching', () => {
    vi.mocked(fetchCategoryPosts).mockReturnValue(new Promise(() => {}))
    const { result } = renderHook(() => usePosts('1'))
    expect(result.current.isLoading).toBe(true)
  })

  test('sets error on fetch failure', async () => {
    vi.mocked(fetchCategoryPosts).mockRejectedValue(new Error('fail'))
    const { result } = renderHook(() => usePosts('1'))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.error).toBe('fail')
  })

  test('ignores AbortError', async () => {
    const abortError = new DOMException('The operation was aborted.', 'AbortError')
    vi.mocked(fetchCategoryPosts).mockRejectedValue(abortError)
    const { result } = renderHook(() => usePosts('1'))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.error).toBeNull()
  })

  test('aborts previous fetch when categoryId changes', async () => {
    let capturedSignal: AbortSignal | undefined
    vi.mocked(fetchCategoryPosts).mockImplementation((_id, signal) => {
      capturedSignal = signal
      return Promise.resolve(mockPosts)
    })

    const { rerender } = renderHook(({ id }) => usePosts(id), {
      initialProps: { id: 'a' as string | null },
    })
    await waitFor(() => expect(capturedSignal).toBeDefined())
    const firstSignal = capturedSignal!

    rerender({ id: 'b' })
    expect(firstSignal.aborted).toBe(true)
  })

  test('clears posts when categoryId changes to null', async () => {
    const { result, rerender } = renderHook(({ id }) => usePosts(id), {
      initialProps: { id: '1' as string | null },
    })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.posts.length).toBeGreaterThan(0)

    rerender({ id: null })
    expect(result.current.posts).toEqual([])
  })
})
