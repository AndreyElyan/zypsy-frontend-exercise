import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import Divider from '../divider'

describe('Divider', () => {
  test('renders hr element', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  test('applies default border classes', () => {
    const { container } = render(<Divider />)
    const hr = container.querySelector('hr')!
    expect(hr).toHaveClass('border-t', 'border-accent')
  })

  test('merges custom className', () => {
    const { container } = render(<Divider className="mt-4" />)
    const hr = container.querySelector('hr')!
    expect(hr).toHaveClass('mt-4')
  })
})
