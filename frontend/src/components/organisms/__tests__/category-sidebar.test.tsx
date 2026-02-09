import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CategorySidebar from '../category-sidebar'
import type { Category } from '@/types'

const categories: Category[] = [
  { id: '1', name: 'Tech', favorite: true },
  { id: '2', name: 'Science', favorite: false },
  { id: '3', name: 'Art', favorite: true },
]

const defaultProps = {
  categories,
  selectedCategoryId: null as string | null,
  filter: 'all' as const,
  onFilterChange: vi.fn(),
  onSelectCategory: vi.fn(),
  onToggleFavorite: vi.fn(),
  isLoading: false,
}

describe('CategorySidebar', () => {
  test('shows skeleton items when loading', () => {
    const { container } = render(<CategorySidebar {...defaultProps} isLoading={true} />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(5)
  })

  test('renders all categories when filter is all', () => {
    render(<CategorySidebar {...defaultProps} />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
    expect(screen.getByText('Science')).toBeInTheDocument()
    expect(screen.getByText('Art')).toBeInTheDocument()
  })

  test('renders only favorite categories when filter is favorites', () => {
    render(<CategorySidebar {...defaultProps} filter="favorites" />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
    expect(screen.getByText('Art')).toBeInTheDocument()
    expect(screen.queryByText('Science')).not.toBeInTheDocument()
  })

  test('shows empty message when no favorites exist', () => {
    const noFavs = categories.map((c) => ({ ...c, favorite: false }))
    render(<CategorySidebar {...defaultProps} categories={noFavs} filter="favorites" />)
    expect(screen.getByText('No favorite categories yet')).toBeInTheDocument()
  })

  test('does not show empty message when loading with favorites filter', () => {
    render(
      <CategorySidebar
        {...defaultProps}
        isLoading={true}
        filter="favorites"
        categories={[]}
      />,
    )
    expect(screen.queryByText('No favorite categories yet')).not.toBeInTheDocument()
  })

  test('does not show empty message when filter is all', () => {
    render(<CategorySidebar {...defaultProps} categories={[]} filter="all" />)
    expect(screen.queryByText('No favorite categories yet')).not.toBeInTheDocument()
  })

  test('marks selected category with outlined style', () => {
    const { container } = render(<CategorySidebar {...defaultProps} selectedCategoryId="2" />)
    const buttons = container.querySelectorAll('button[type="button"]')
    const scienceBtn = Array.from(buttons).find((b) => b.textContent?.includes('Science'))!
    expect(scienceBtn).toHaveClass('bg-surface', 'text-primary')
  })

  test('renders heading Posts', () => {
    render(<CategorySidebar {...defaultProps} />)
    expect(screen.getByRole('heading', { name: 'Posts' })).toBeInTheDocument()
  })

  test('renders filter tabs', () => {
    render(<CategorySidebar {...defaultProps} />)
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getByText('Favorite categories')).toBeInTheDocument()
  })
})
