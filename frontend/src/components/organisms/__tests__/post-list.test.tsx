import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PostList from '../post-list'
import type { Post, Category } from '@/types'

const posts: Post[] = [
  { id: 'p1', description: 'First post content here', date: '2024-05-20', categories: ['1'] },
  { id: 'p2', description: 'Second post content here', date: '2024-05-21', categories: ['1'] },
]

const categoriesMap: Record<string, Category> = {
  '1': { id: '1', name: 'Tech', favorite: false },
}

const defaultProps = {
  posts,
  categoryName: 'Tech' as string | null,
  selectedCategoryId: '1' as string | null,
  categoriesMap,
  onToggleFavorite: vi.fn(),
  isLoading: false,
}

describe('PostList', () => {
  test('shows empty state when no categoryName and not loading', () => {
    render(<PostList {...defaultProps} categoryName={null} posts={[]} />)
    expect(screen.getByText('Select a category to view posts')).toBeInTheDocument()
  })

  test('shows loading skeletons when isLoading', () => {
    const { container } = render(<PostList {...defaultProps} isLoading={true} />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  test('shows 3 skeleton groups with 3 dividers when loading', () => {
    const { container } = render(<PostList {...defaultProps} isLoading={true} />)
    const dividers = container.querySelectorAll('hr')
    expect(dividers).toHaveLength(3)
  })

  test('shows post count and category name', () => {
    render(<PostList {...defaultProps} />)
    expect(screen.getByText(/Found 2 posts of/)).toBeInTheDocument()
  })

  test('renders post cards for each post', () => {
    render(<PostList {...defaultProps} />)
    expect(screen.getByText('First post content here')).toBeInTheDocument()
    expect(screen.getByText('Second post content here')).toBeInTheDocument()
  })

  test('renders header divider plus dividers between posts', () => {
    const { container } = render(<PostList {...defaultProps} />)
    const dividers = container.querySelectorAll('hr')
    expect(dividers).toHaveLength(2)
  })

  test('shows no posts found when empty array', () => {
    render(<PostList {...defaultProps} posts={[]} />)
    expect(screen.getByText('No posts found for this category')).toBeInTheDocument()
  })

  test('shows loading state when isLoading even with null categoryName', () => {
    const { container } = render(
      <PostList
        posts={[]}
        categoryName={null}
        selectedCategoryId={null}
        categoriesMap={categoriesMap}
        onToggleFavorite={vi.fn()}
        isLoading={true}
      />,
    )
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })
})
