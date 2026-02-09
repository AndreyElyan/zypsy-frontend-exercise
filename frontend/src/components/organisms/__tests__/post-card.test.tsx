import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostCard from '../post-card'
import type { Post, Category } from '@/types'

const post: Post = {
  id: 'p1',
  description: 'A great post about coding',
  date: '2024-05-23',
  categories: ['1', '2', '999'],
}

const categoriesMap: Record<string, Category> = {
  '1': { id: '1', name: 'Tech', favorite: false },
  '2': { id: '2', name: 'Science', favorite: true },
}

describe('PostCard', () => {
  test('renders formatted date', () => {
    render(<PostCard post={post} categoriesMap={categoriesMap} onToggleFavorite={vi.fn()} />)
    expect(screen.getByText('Thursday, May 23rd 2024')).toBeInTheDocument()
  })

  test('renders post description', () => {
    render(<PostCard post={post} categoriesMap={categoriesMap} onToggleFavorite={vi.fn()} />)
    expect(screen.getByText('A great post about coding')).toBeInTheDocument()
  })

  test('renders category tags for known categories', () => {
    render(<PostCard post={post} categoriesMap={categoriesMap} onToggleFavorite={vi.fn()} />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
    expect(screen.getByText('Science')).toBeInTheDocument()
  })

  test('filters out categories not in map', () => {
    const { container } = render(
      <PostCard post={post} categoriesMap={categoriesMap} onToggleFavorite={vi.fn()} />,
    )
    const tags = container.querySelectorAll('span.rounded-full')
    expect(tags).toHaveLength(2)
  })

  test('calls onToggleFavorite when category star clicked', async () => {
    const user = userEvent.setup()
    const onToggleFavorite = vi.fn()
    const { container } = render(
      <PostCard post={post} categoriesMap={categoriesMap} onToggleFavorite={onToggleFavorite} />,
    )
    const scienceStar = container.querySelectorAll('svg[role="button"]')[1]
    await user.click(scienceStar)
    expect(onToggleFavorite).toHaveBeenCalledWith(categoriesMap['2'])
  })
})
