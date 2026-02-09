import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorState from '../error-state'

describe('ErrorState', () => {
  test('renders default title and description', () => {
    render(<ErrorState />)
    expect(screen.getByText('Unable to connect to server')).toBeInTheDocument()
    expect(screen.getByText('Please check your connection and try again.')).toBeInTheDocument()
  })

  test('renders custom title and description', () => {
    render(<ErrorState title="Custom error" description="Custom message" />)
    expect(screen.getByText('Custom error')).toBeInTheDocument()
    expect(screen.getByText('Custom message')).toBeInTheDocument()
  })

  test('renders retry button when onRetry provided', () => {
    render(<ErrorState onRetry={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })

  test('does not render retry button when onRetry not provided', () => {
    render(<ErrorState />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('calls onRetry when button clicked', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ErrorState onRetry={onRetry} />)
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
