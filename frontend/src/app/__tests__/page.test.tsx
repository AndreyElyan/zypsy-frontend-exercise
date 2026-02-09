import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../page'

vi.mock('@/components/templates/posts-page-template', () => ({
  default: () => <div data-testid="posts-page-template" />,
}))

describe('Home', () => {
  test('renders PostsPageTemplate inside Suspense', () => {
    render(<Home />)
    expect(screen.getByTestId('posts-page-template')).toBeInTheDocument()
  })
})
