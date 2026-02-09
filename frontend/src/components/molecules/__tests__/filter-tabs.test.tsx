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
    const { container } = render(<FilterTabs activeFilter="all" onFilterChange={vi.fn()} />)
    const buttons = container.querySelectorAll('button')
    const allOuter = buttons[0].querySelector('span')!
    const favOuter = buttons[1].querySelector('span')!
    expect(allOuter).toHaveClass('border-primary')
    expect(allOuter.querySelector('span')).not.toBeNull()
    expect(favOuter).toHaveClass('border-accent')
    expect(favOuter.querySelector('span')).toBeNull()
  })

  test('marks Favorite categories as active when filter is favorites', () => {
    const { container } = render(<FilterTabs activeFilter="favorites" onFilterChange={vi.fn()} />)
    const buttons = container.querySelectorAll('button')
    const allOuter = buttons[0].querySelector('span')!
    const favOuter = buttons[1].querySelector('span')!
    expect(favOuter).toHaveClass('border-primary')
    expect(favOuter.querySelector('span')).not.toBeNull()
    expect(allOuter).toHaveClass('border-accent')
    expect(allOuter.querySelector('span')).toBeNull()
  })

  test('calls onFilterChange with all when first tab clicked', async () => {
    const user = userEvent.setup()
    const onFilterChange = vi.fn()
    render(<FilterTabs activeFilter="favorites" onFilterChange={onFilterChange} />)
    await user.click(screen.getByText('All categories'))
    expect(onFilterChange).toHaveBeenCalledWith('all')
  })

  test('has radiogroup role with accessible label', () => {
    render(<FilterTabs activeFilter="all" onFilterChange={vi.fn()} />)
    const group = screen.getByRole('radiogroup', { name: 'Category filter' })
    expect(group).toBeInTheDocument()
  })

  test('calls onFilterChange with favorites when second tab clicked', async () => {
    const user = userEvent.setup()
    const onFilterChange = vi.fn()
    render(<FilterTabs activeFilter="all" onFilterChange={onFilterChange} />)
    await user.click(screen.getByText('Favorite categories'))
    expect(onFilterChange).toHaveBeenCalledWith('favorites')
  })
})
