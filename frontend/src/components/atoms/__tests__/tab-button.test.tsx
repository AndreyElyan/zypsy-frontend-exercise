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
    render(<TabButton label="All" active={true} onClick={vi.fn()} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('text-olive-800', 'border-olive-800')
  })

  test('applies inactive styling when not active', () => {
    render(<TabButton label="All" active={false} onClick={vi.fn()} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('text-gray-400', 'border-transparent')
  })

  test('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TabButton label="All" active={false} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('has type button', () => {
    render(<TabButton label="All" active={false} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })
})
