import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from '../layout'

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
}))

describe('RootLayout', () => {
  test('renders children', () => {
    render(<RootLayout><p>hello</p></RootLayout>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  test('exports correct metadata', () => {
    expect(metadata.title).toBe('Posts')
    expect(metadata.description).toBe('Posts list with category filtering')
  })

  test('applies font variable and antialiased class', () => {
    render(<RootLayout><p>test</p></RootLayout>)
    expect(document.body.className).toContain('antialiased')
    expect(document.body.className).toContain('--font-inter')
  })
})
