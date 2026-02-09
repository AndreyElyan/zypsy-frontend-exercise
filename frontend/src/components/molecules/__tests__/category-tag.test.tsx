import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryTag from '../category-tag'
import type { Category } from '@/types'

const category: Category = { id: '1', name: 'Tech', favorite: true }

describe('CategoryTag', () => {
  test('renders category name inside badge', () => {
    render(<CategoryTag category={category} onToggleFavorite={vi.fn()} />)
    expect(screen.getByText('Tech')).toBeInTheDocument()
  })

  test('renders star with correct filled state', () => {
    render(<CategoryTag category={category} onToggleFavorite={vi.fn()} />)
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument()
  })

  test('calls onToggleFavorite when star clicked', async () => {
    const user = userEvent.setup()
    const onToggleFavorite = vi.fn()
    render(<CategoryTag category={category} onToggleFavorite={onToggleFavorite} />)
    await user.click(screen.getByLabelText('Remove from favorites'))
    expect(onToggleFavorite).toHaveBeenCalledWith(category)
  })

  test('renders primary badge by default', () => {
    render(<CategoryTag category={category} onToggleFavorite={vi.fn()} />)
    const badge = screen.getByText('Tech').closest('span')!
    expect(badge).toHaveClass('bg-primary', 'text-primary-fg')
  })

  test('renders secondary badge when isSelected', () => {
    render(<CategoryTag category={category} isSelected onToggleFavorite={vi.fn()} />)
    const badge = screen.getByText('Tech').closest('span')!
    expect(badge).toHaveClass('bg-surface', 'text-primary', 'border-primary')
  })
})
