import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '../badge'

describe('Badge', () => {
  test('renders children', () => {
    render(<Badge>Hello</Badge>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  test('applies default styling classes', () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('rounded-full', 'bg-olive-800', 'text-white')
  })

  test('merges custom className', () => {
    render(<Badge className="ml-2">Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('ml-2')
  })
})
