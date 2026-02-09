import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchCategories, updateCategory, fetchCategoryPosts } from '../api'

const mockCategory = { id: '1', name: 'Tech', favorite: false }
const mockPost = { id: 'p1', description: 'Test', date: '2024-01-01', categories: ['1'] }

let mockFetch: ReturnType<typeof vi.fn>

beforeEach(() => {
  mockFetch = vi.fn()
  vi.stubGlobal('fetch', mockFetch)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('fetchCategories', () => {
  test('returns categories on success', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([mockCategory]) })
    const result = await fetchCategories()
    expect(result).toEqual([mockCategory])
  })

  test('throws on non-ok response', async () => {
    mockFetch.mockResolvedValue({ ok: false })
    await expect(fetchCategories()).rejects.toThrow('Failed to fetch categories')
  })

  test('calls correct URL with fallback base', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) })
    await fetchCategories()
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/categories')
  })
})

describe('updateCategory', () => {
  test('returns updated category on success', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockCategory) })
    const result = await updateCategory('1', { name: 'Tech', favorite: true })
    expect(result).toEqual(mockCategory)
  })

  test('sends PUT with correct headers and body', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockCategory) })
    await updateCategory('1', { name: 'Tech', favorite: true })
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/categories/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Tech', favorite: true }),
    })
  })

  test('throws on non-ok response', async () => {
    mockFetch.mockResolvedValue({ ok: false })
    await expect(updateCategory('1', { name: 'Tech', favorite: true })).rejects.toThrow(
      'Failed to update category',
    )
  })
})

describe('fetchCategoryPosts', () => {
  test('returns posts on success', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([mockPost]) })
    const result = await fetchCategoryPosts('1')
    expect(result).toEqual([mockPost])
  })

  test('throws on non-ok response', async () => {
    mockFetch.mockResolvedValue({ ok: false })
    await expect(fetchCategoryPosts('1')).rejects.toThrow('Failed to fetch posts')
  })

  test('passes signal to fetch', async () => {
    const controller = new AbortController()
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) })
    await fetchCategoryPosts('1', controller.signal)
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/categories/1/posts', {
      signal: controller.signal,
    })
  })
})
