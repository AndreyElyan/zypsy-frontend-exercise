import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NotFound from '../not-found'

describe('NotFound', () => {
  test('renders page not found message', () => {
    render(<NotFound />)
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(
      screen.getByText('The page you are looking for does not exist or has been moved.'),
    ).toBeInTheDocument()
  })

  test('renders back to home link', () => {
    render(<NotFound />)
    const link = screen.getByRole('link', { name: 'Back to home' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
