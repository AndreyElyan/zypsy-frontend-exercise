import { test, expect } from '@playwright/test'

function selectCategory(page: ReturnType<typeof test.info>['config'] extends never ? never : Awaited<ReturnType<typeof import('@playwright/test').chromium.launch>>['newPage'] extends (...args: never[]) => Promise<infer P> ? P : never, name: string) {
  return page.locator('aside').getByRole('button').filter({ hasText: name }).click({ position: { x: 10, y: 10 } })
}

test.describe('Category sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('aside').getByRole('button', { name: /Cooking/i }).waitFor()
  })

  test('loads all categories', async ({ page }) => {
    const sidebar = page.locator('aside')
    await expect(sidebar.getByText('Cooking')).toBeVisible()
    await expect(sidebar.getByText('Latest Tech News')).toBeVisible()
    await expect(sidebar.getByText('Product Reviews')).toBeVisible()
    await expect(sidebar.getByText('DIY Projects')).toBeVisible()
    await expect(sidebar.getByText('Investing')).toBeVisible()
    await expect(sidebar.getByText('Entrepreneurship')).toBeVisible()
    await expect(sidebar.getByText('Motorsport')).toBeVisible()
  })

  test('selects category and shows posts', async ({ page }) => {
    await page.locator('aside').getByRole('button').filter({ hasText: 'Cooking' }).click({ position: { x: 10, y: 10 } })

    await expect(page).toHaveURL(/category=/)
    await expect(page.getByText(/Found \d+ posts of/)).toBeVisible()
  })

  test('persists selection on page reload', async ({ page }) => {
    await page.locator('aside').getByRole('button').filter({ hasText: 'Cooking' }).click({ position: { x: 10, y: 10 } })
    await expect(page.getByText(/Found \d+ posts of/)).toBeVisible()

    await page.reload()
    await expect(page.getByText(/Found \d+ posts of/)).toBeVisible()
    await expect(page).toHaveURL(/category=/)
  })

  test('filters by favorite categories', async ({ page }) => {
    await page.getByRole('button', { name: 'Favorite categories' }).click()

    const sidebar = page.locator('aside')
    const categoryButtons = sidebar.locator('div').last().locator('button')
    const count = await categoryButtons.count()

    for (let i = 0; i < count; i++) {
      const button = categoryButtons.nth(i)
      await expect(button.locator('svg[aria-label="Remove from favorites"]')).toBeVisible()
    }
  })

  test('switches back to all categories', async ({ page }) => {
    await page.getByRole('button', { name: 'Favorite categories' }).click()
    await page.getByRole('button', { name: 'All categories' }).click()

    const sidebar = page.locator('aside')
    await expect(sidebar.getByText('Cooking')).toBeVisible()
    await expect(sidebar.getByText('Motorsport')).toBeVisible()
  })
})
