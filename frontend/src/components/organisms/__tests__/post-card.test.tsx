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

const defaultProps = {
  post,
  categoriesMap,
  selectedCategoryId: null as string | null,
  onToggleFavorite: vi.fn(),
}

describe('PostCard', () => {
  test('renders formatted date', () => {
    render(<PostCard {...defaultProps} />)
    expect(screen.getByText('Thursday, May 23rd 2024')).toBeInTheDocument()
  })

  test('renders post description', () => {
    render(<PostCard {...defaultProps} />)
    expect(screen.getByText('A great post about coding')).toBeInTheDocument()
  })

  test('renders category tags for known categories', () => {
    render(<PostCard {...defaultProps} />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
    expect(screen.getByText('Science')).toBeInTheDocument()
  })

  test('filters out categories not in map', () => {
    const { container } = render(<PostCard {...defaultProps} />)
    const tags = container.querySelectorAll('span.rounded')
    expect(tags).toHaveLength(2)
  })

  test('calls onToggleFavorite when category star clicked', async () => {
    const user = userEvent.setup()
    const onToggleFavorite = vi.fn()
    const { container } = render(
      <PostCard {...defaultProps} onToggleFavorite={onToggleFavorite} />,
    )
    const scienceStar = container.querySelectorAll('svg[role="button"]')[1]
    await user.click(scienceStar)
    expect(onToggleFavorite).toHaveBeenCalledWith(categoriesMap['2'])
  })

  test('renders selected category tag as secondary variant', () => {
    render(<PostCard {...defaultProps} selectedCategoryId="1" />)
    const techBadge = screen.getByText('Tech').closest('span')!
    expect(techBadge).toHaveClass('bg-surface', 'text-primary', 'border-primary')
    const scienceBadge = screen.getByText('Science').closest('span')!
    expect(scienceBadge).toHaveClass('bg-primary', 'text-primary-fg')
  })
})
