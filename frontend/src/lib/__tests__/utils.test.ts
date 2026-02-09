import { describe, test, expect } from 'vitest'
import { cn, formatPostDate } from '../utils'

describe('cn', () => {
  test('merges multiple class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  test('resolves Tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  test('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra')
  })
})

describe('formatPostDate', () => {
  test('formats with "st" suffix for day 1', () => {
    expect(formatPostDate('2024-01-01')).toBe('Monday, January 1st 2024')
  })

  test('formats with "nd" suffix for day 2', () => {
    expect(formatPostDate('2024-01-02')).toBe('Tuesday, January 2nd 2024')
  })

  test('formats with "rd" suffix for day 3', () => {
    expect(formatPostDate('2024-01-03')).toBe('Wednesday, January 3rd 2024')
  })

  test('formats with "th" suffix for day 11 (teen exception)', () => {
    expect(formatPostDate('2024-01-11')).toBe('Thursday, January 11th 2024')
  })

  test('formats with "th" suffix for day 12 (teen exception)', () => {
    expect(formatPostDate('2024-01-12')).toBe('Friday, January 12th 2024')
  })

  test('formats with "th" suffix for day 13 (teen exception)', () => {
    expect(formatPostDate('2024-01-13')).toBe('Saturday, January 13th 2024')
  })

  test('formats with "st" suffix for day 21', () => {
    expect(formatPostDate('2024-01-21')).toBe('Sunday, January 21st 2024')
  })

  test('formats with "nd" suffix for day 22', () => {
    expect(formatPostDate('2024-01-22')).toBe('Monday, January 22nd 2024')
  })

  test('formats with "rd" suffix for day 23', () => {
    expect(formatPostDate('2024-01-23')).toBe('Tuesday, January 23rd 2024')
  })

  test('formats with "th" suffix for default case', () => {
    expect(formatPostDate('2024-01-25')).toBe('Thursday, January 25th 2024')
  })

  test('formats full date string correctly', () => {
    expect(formatPostDate('2024-05-23')).toBe('Thursday, May 23rd 2024')
  })
})
