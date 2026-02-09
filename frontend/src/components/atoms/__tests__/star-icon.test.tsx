import { describe, test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StarIcon from '../star-icon'

function getSvg(container: HTMLElement) {
  return container.querySelector('svg')!
}

describe('StarIcon', () => {
  test('renders filled star with gold color', () => {
    const { container } = render(<StarIcon filled={true} />)
    expect(getSvg(container)).toHaveClass('fill-star-gold', 'text-star-gold')
  })

  test('renders unfilled star with transparent fill', () => {
    const { container } = render(<StarIcon filled={false} />)
    expect(getSvg(container)).toHaveClass('fill-transparent')
  })

  test('sets strokeWidth 0 when filled', () => {
    const { container } = render(<StarIcon filled={true} />)
    expect(getSvg(container).getAttribute('stroke-width')).toBe('0')
  })

  test('sets strokeWidth 1.5 when not filled', () => {
    const { container } = render(<StarIcon filled={false} />)
    expect(getSvg(container).getAttribute('stroke-width')).toBe('1.5')
  })

  test('renders default md size', () => {
    const { container } = render(<StarIcon filled={false} />)
    expect(getSvg(container)).toHaveClass('w-4', 'h-4')
  })

  test('renders sm size', () => {
    const { container } = render(<StarIcon filled={false} size="sm" />)
    expect(getSvg(container)).toHaveClass('w-3.5', 'h-3.5')
  })

  test('has role button when onClick provided', () => {
    const { container } = render(<StarIcon filled={false} onClick={vi.fn()} />)
    expect(getSvg(container)).toHaveAttribute('role', 'button')
  })

  test('has no role when onClick not provided', () => {
    const { container } = render(<StarIcon filled={false} />)
    expect(getSvg(container)).not.toHaveAttribute('role')
  })

  test('shows Remove from favorites when filled', () => {
    const { container } = render(<StarIcon filled={true} />)
    expect(getSvg(container)).toHaveAttribute('aria-label', 'Remove from favorites')
  })

  test('shows Add to favorites when not filled', () => {
    const { container } = render(<StarIcon filled={false} />)
    expect(getSvg(container)).toHaveAttribute('aria-label', 'Add to favorites')
  })

  test('calls onClick with stopPropagation on click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const parentClick = vi.fn()
    const { container } = render(
      <div onClick={parentClick}>
        <StarIcon filled={false} onClick={onClick} />
      </div>,
    )
    await user.click(getSvg(container))
    expect(onClick).toHaveBeenCalledOnce()
    expect(parentClick).not.toHaveBeenCalled()
  })

  test('has cursor-pointer when onClick provided', () => {
    const { container } = render(<StarIcon filled={false} onClick={vi.fn()} />)
    expect(getSvg(container)).toHaveClass('cursor-pointer')
  })

  test('applies custom className', () => {
    const { container } = render(<StarIcon filled={false} className="custom" />)
    expect(getSvg(container)).toHaveClass('custom')
  })
})
