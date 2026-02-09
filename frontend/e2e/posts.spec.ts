import { test, expect } from '@playwright/test'

test.describe('Post list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('aside').getByText('Cooking').waitFor()
  })

  test('shows empty state when no category selected', async ({ page }) => {
    await expect(page.getByText('Select a category to view posts')).toBeVisible()
  })

  test('displays post cards with dates and descriptions', async ({ page }) => {
    await page.locator('aside').getByRole('button').filter({ hasText: 'Cooking' }).click({ position: { x: 10, y: 10 } })
    await expect(page.getByText(/Found \d+ posts of/)).toBeVisible()

    const articles = page.locator('article')
    const count = await articles.count()
    expect(count).toBeGreaterThan(0)

    const firstArticle = articles.first()
    await expect(firstArticle.locator('h3')).toBeVisible()
    await expect(firstArticle.locator('p')).toBeVisible()
  })

  test('posts are sorted by date newest first', async ({ page }) => {
    await page.locator('aside').getByRole('button').filter({ hasText: 'Cooking' }).click({ position: { x: 10, y: 10 } })
    await expect(page.getByText(/Found \d+ posts of/)).toBeVisible()

    const dateHeaders = page.locator('article h3')
    const count = await dateHeaders.count()

    if (count >= 2) {
      const firstDateText = await dateHeaders.first().textContent()
      const secondDateText = await dateHeaders.nth(1).textContent()
      expect(firstDateText).toBeTruthy()
      expect(secondDateText).toBeTruthy()

      const parseDate = (text: string) =>
        new Date(text!.replace(/(\d+)(st|nd|rd|th)/, '$1'))
      const firstDate = parseDate(firstDateText!)
      const secondDate = parseDate(secondDateText!)
      expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime())
    }
  })

  test('post count matches header', async ({ page }) => {
    await page.locator('aside').getByRole('button').filter({ hasText: 'Cooking' }).click({ position: { x: 10, y: 10 } })

    const header = page.getByText(/Found \d+ posts of/)
    await expect(header).toBeVisible()
    const headerText = await header.textContent()
    const match = headerText?.match(/Found (\d+) posts/)
    const expectedCount = parseInt(match?.[1] ?? '0')

    const articles = page.locator('article')
    await expect(articles).toHaveCount(expectedCount)
  })

  test('post cards show category tags', async ({ page }) => {
    await page.locator('aside').getByRole('button').filter({ hasText: 'Cooking' }).click({ position: { x: 10, y: 10 } })
    await expect(page.getByText(/Found \d+ posts of/)).toBeVisible()

    const firstArticle = page.locator('article').first()
    const tags = firstArticle.locator('span')
    const tagCount = await tags.count()
    expect(tagCount).toBeGreaterThan(0)
  })
})
