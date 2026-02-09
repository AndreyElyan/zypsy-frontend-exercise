import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import PostsPageTemplate from '../posts-page-template'
import { useSelectedCategory } from '@/hooks/use-selected-category'
import { useCategories } from '@/hooks/use-categories'
import { usePosts } from '@/hooks/use-posts'
import { useCategoryFilter } from '@/hooks/use-category-filter'

vi.mock('@/hooks/use-selected-category')
vi.mock('@/hooks/use-categories')
vi.mock('@/hooks/use-posts')
vi.mock('@/hooks/use-category-filter')

const mockToggleFavorite = vi.fn()
const mockSelectCategory = vi.fn()
const mockSetFilter = vi.fn()

beforeEach(() => {
  vi.mocked(useSelectedCategory).mockReturnValue({
    selectedCategoryId: null,
    selectCategory: mockSelectCategory,
  })
  vi.mocked(useCategories).mockReturnValue({
    categories: [{ id: '1', name: 'Tech', favorite: false }],
    categoriesMap: { '1': { id: '1', name: 'Tech', favorite: false } },
    isLoading: false,
    error: null,
    toggleFavorite: mockToggleFavorite,
  })
  vi.mocked(usePosts).mockReturnValue({
    posts: [],
    isLoading: false,
    error: null,
  })
  vi.mocked(useCategoryFilter).mockReturnValue({
    filter: 'all',
    setFilter: mockSetFilter,
  })
})

describe('PostsPageTemplate', () => {
  test('renders sidebar and post list', () => {
    render(<PostsPageTemplate />)
    expect(screen.getByRole('heading', { name: 'Posts' })).toBeInTheDocument()
    expect(screen.getByText('Select a category to view posts')).toBeInTheDocument()
  })

  test('derives categoryName when category exists in map', () => {
    vi.mocked(useSelectedCategory).mockReturnValue({
      selectedCategoryId: '1',
      selectCategory: mockSelectCategory,
    })
    vi.mocked(usePosts).mockReturnValue({
      posts: [{ id: 'p1', description: 'Test post', date: '2024-01-01', categories: ['1'] }],
      isLoading: false,
      error: null,
    })
    render(<PostsPageTemplate />)
    expect(screen.getByText(/Found 1 posts of/)).toBeInTheDocument()
  })

  test('derives null name when category id not in map', () => {
    vi.mocked(useSelectedCategory).mockReturnValue({
      selectedCategoryId: '999',
      selectCategory: mockSelectCategory,
    })
    vi.mocked(useCategories).mockReturnValue({
      categories: [],
      categoriesMap: {},
      isLoading: false,
      error: null,
      toggleFavorite: mockToggleFavorite,
    })
    render(<PostsPageTemplate />)
    expect(screen.getByText('Select a category to view posts')).toBeInTheDocument()
  })

  test('derives null name when no category selected', () => {
    vi.mocked(useCategories).mockReturnValue({
      categories: [],
      categoriesMap: {},
      isLoading: false,
      error: null,
      toggleFavorite: mockToggleFavorite,
    })
    render(<PostsPageTemplate />)
    expect(screen.getByText('Select a category to view posts')).toBeInTheDocument()
  })

  test('renders categories in sidebar', () => {
    render(<PostsPageTemplate />)
    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toHaveTextContent('Tech')
  })
})
