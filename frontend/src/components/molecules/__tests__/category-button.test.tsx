import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryButton from '../category-button'
import type { Category } from '@/types'

const category: Category = { id: '1', name: 'Tech', favorite: false }
const favoriteCategory: Category = { id: '2', name: 'Science', favorite: true }

const defaultProps = {
  category,
  isSelected: false,
  onSelect: vi.fn(),
  onToggleFavorite: vi.fn(),
}

describe('CategoryButton', () => {
  test('renders category name', () => {
    render(<CategoryButton {...defaultProps} />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
  })

  test('applies outlined style when selected', () => {
    const { container } = render(<CategoryButton {...defaultProps} isSelected={true} />)
    expect(container.querySelector('button')).toHaveClass('bg-surface', 'text-primary')
  })

  test('applies primary style when not selected', () => {
    const { container } = render(<CategoryButton {...defaultProps} />)
    expect(container.querySelector('button')).toHaveClass('bg-primary', 'text-primary-fg')
  })

  test('calls onSelect with category id on click', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { container } = render(<CategoryButton {...defaultProps} onSelect={onSelect} />)
    await user.click(container.querySelector('button')!)
    expect(onSelect).toHaveBeenCalledWith('1')
  })

  test('renders star with correct filled state', () => {
    const { container } = render(<CategoryButton {...defaultProps} category={favoriteCategory} />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('aria-label', 'Remove from favorites')
  })

  test('calls onToggleFavorite when star is clicked', async () => {
    const user = userEvent.setup()
    const onToggleFavorite = vi.fn()
    const { container } = render(
      <CategoryButton {...defaultProps} onToggleFavorite={onToggleFavorite} />,
    )
    await user.click(container.querySelector('svg')!)
    expect(onToggleFavorite).toHaveBeenCalledWith(category)
  })

  test('star click does not trigger onSelect', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { container } = render(<CategoryButton {...defaultProps} onSelect={onSelect} />)
    await user.click(container.querySelector('svg')!)
    expect(onSelect).not.toHaveBeenCalled()
  })
})
