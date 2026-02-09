import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '../badge'

describe('Badge', () => {
  test('renders children', () => {
    render(<Badge>Hello</Badge>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  test('applies primary styling by default', () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('rounded', 'bg-primary', 'text-primary-fg')
  })

  test('applies secondary styling when variant is secondary', () => {
    render(<Badge variant="secondary">Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('rounded', 'bg-surface', 'text-primary', 'border-primary')
  })

  test('merges custom className', () => {
    render(<Badge className="ml-2">Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('ml-2')
  })
})
