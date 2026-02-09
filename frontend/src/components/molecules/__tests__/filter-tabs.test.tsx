import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterTabs from '../filter-tabs'

describe('FilterTabs', () => {
  test('renders both tab labels', () => {
    render(<FilterTabs activeFilter="all" onFilterChange={vi.fn()} />)
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getByText('Favorite categories')).toBeInTheDocument()
  })

  test('marks All categories as active when filter is all', () => {
    render(<FilterTabs activeFilter="all" onFilterChange={vi.fn()} />)
    expect(screen.getByText('All categories')).toHaveClass('text-olive-800')
    expect(screen.getByText('Favorite categories')).toHaveClass('text-gray-400')
  })

  test('marks Favorite categories as active when filter is favorites', () => {
    render(<FilterTabs activeFilter="favorites" onFilterChange={vi.fn()} />)
    expect(screen.getByText('Favorite categories')).toHaveClass('text-olive-800')
    expect(screen.getByText('All categories')).toHaveClass('text-gray-400')
  })

  test('calls onFilterChange with all when first tab clicked', async () => {
    const user = userEvent.setup()
    const onFilterChange = vi.fn()
    render(<FilterTabs activeFilter="favorites" onFilterChange={onFilterChange} />)
    await user.click(screen.getByText('All categories'))
    expect(onFilterChange).toHaveBeenCalledWith('all')
  })

  test('calls onFilterChange with favorites when second tab clicked', async () => {
    const user = userEvent.setup()
    const onFilterChange = vi.fn()
    render(<FilterTabs activeFilter="all" onFilterChange={onFilterChange} />)
    await user.click(screen.getByText('Favorite categories'))
    expect(onFilterChange).toHaveBeenCalledWith('favorites')
  })
})
