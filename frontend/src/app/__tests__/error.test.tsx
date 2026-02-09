import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorPage from '../error'

describe('ErrorPage', () => {
  test('renders error state with default message', () => {
    render(<ErrorPage error={new globalThis.Error('test')} reset={vi.fn()} />)
    expect(screen.getByText('Unable to connect to server')).toBeInTheDocument()
  })

  test('calls reset when retry button is clicked', async () => {
    const user = userEvent.setup()
    const reset = vi.fn()
    render(<ErrorPage error={new globalThis.Error('test')} reset={reset} />)
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(reset).toHaveBeenCalledOnce()
  })
})
