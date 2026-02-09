import type { Category, Post } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000'

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE}/categories`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  return response.json()
}

export async function updateCategory(
  id: string,
  data: { name: string; favorite: boolean },
): Promise<Category> {
  const response = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update category')
  return response.json()
}

export async function fetchCategoryPosts(
  categoryId: string,
  signal?: AbortSignal,
): Promise<Post[]> {
  const response = await fetch(`${API_BASE}/categories/${categoryId}/posts`, { signal })
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}
