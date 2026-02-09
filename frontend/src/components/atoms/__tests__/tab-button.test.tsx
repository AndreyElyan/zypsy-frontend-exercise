import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TabButton from '../tab-button'

describe('TabButton', () => {
  test('renders label text', () => {
    render(<TabButton label="All" active={false} onClick={vi.fn()} />)
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  test('applies active styling when active', () => {
    const { container } = render(<TabButton label="All" active={true} onClick={vi.fn()} />)
    const outerCircle = container.querySelector('span')!
    expect(outerCircle).toHaveClass('border-primary')
    const innerDot = outerCircle.querySelector('span')!
    expect(innerDot).toHaveClass('bg-primary')
  })

  test('applies inactive styling when not active', () => {
    const { container } = render(<TabButton label="All" active={false} onClick={vi.fn()} />)
    const outerCircle = container.querySelector('span')!
    expect(outerCircle).toHaveClass('border-accent')
    expect(outerCircle.querySelector('span')).toBeNull()
  })

  test('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TabButton label="All" active={false} onClick={onClick} />)
    await user.click(screen.getByRole('radio'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('has type button', () => {
    render(<TabButton label="All" active={false} onClick={vi.fn()} />)
    expect(screen.getByRole('radio')).toHaveAttribute('type', 'button')
  })

  test('has role radio with aria-checked true when active', () => {
    render(<TabButton label="All" active={true} onClick={vi.fn()} />)
    const radio = screen.getByRole('radio')
    expect(radio).toHaveAttribute('aria-checked', 'true')
  })

  test('has role radio with aria-checked false when inactive', () => {
    render(<TabButton label="All" active={false} onClick={vi.fn()} />)
    const radio = screen.getByRole('radio')
    expect(radio).toHaveAttribute('aria-checked', 'false')
  })
})
