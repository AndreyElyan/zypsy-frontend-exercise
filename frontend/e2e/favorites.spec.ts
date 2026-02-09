import { test, expect } from '@playwright/test'

test.describe('Favorite toggling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('aside').getByText('Cooking').waitFor()
  })

  test('toggles favorite via sidebar star', async ({ page }) => {
    const sidebar = page.locator('aside')
    const cookingButton = sidebar.getByRole('button').filter({ hasText: 'Cooking' })
    const star = cookingButton.locator('svg[role="button"]')
    const initialLabel = await star.getAttribute('aria-label')

    await star.click()

    const newLabel = await star.getAttribute('aria-label')
    expect(newLabel).not.toBe(initialLabel)
  })

  test('toggles favorite via post tag star', async ({ page }) => {
    await page.locator('aside').getByRole('button').filter({ hasText: 'Cooking' }).click({ position: { x: 10, y: 10 } })
    await expect(page.getByText(/Found \d+ posts of/)).toBeVisible()

    const article = page.locator('article').first()
    const tagStar = article.locator('svg[role="button"]').first()
    await expect(tagStar).toBeVisible()

    const initialLabel = await tagStar.getAttribute('aria-label')
    await tagStar.click()

    const newLabel = await tagStar.getAttribute('aria-label')
    expect(newLabel).not.toBe(initialLabel)
  })

  test('favorite appears in filtered view', async ({ page }) => {
    const sidebar = page.locator('aside')
    const cookingButton = sidebar.getByRole('button').filter({ hasText: 'Cooking' })
    const star = cookingButton.locator('svg[role="button"]')
    const label = await star.getAttribute('aria-label')
    if (label === 'Add to favorites') {
      await star.click()
    }

    await page.getByRole('button', { name: 'Favorite categories' }).click()

    await expect(sidebar.getByText('Cooking')).toBeVisible()
  })
})
