import { test, expect } from '@playwright/test'

test.describe('Responsive layout', () => {
  test('desktop: sidebar on left, content on right', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')

    const sidebar = page.locator('aside')
    await expect(sidebar).toBeVisible()

    const sidebarBox = await sidebar.boundingBox()
    expect(sidebarBox).toBeTruthy()
    expect(sidebarBox!.x).toBeLessThan(50)
    expect(sidebarBox!.width).toBeGreaterThanOrEqual(200)
    expect(sidebarBox!.width).toBeLessThanOrEqual(330)
  })

  test('mobile: sidebar stacks on top', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const sidebar = page.locator('aside')
    await expect(sidebar).toBeVisible()

    const sidebarBox = await sidebar.boundingBox()
    expect(sidebarBox).toBeTruthy()
    expect(sidebarBox!.width).toBeGreaterThanOrEqual(370)
  })

  test('mobile: categories scroll horizontally', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const sidebar = page.locator('aside')
    await expect(sidebar.getByRole('button', { name: /Cooking/i })).toBeVisible()

    const categoryContainer = sidebar.locator('div').filter({ has: page.locator('button:has-text("Cooking")') }).first()
    const overflowX = await categoryContainer.evaluate((el) => getComputedStyle(el).overflowX)
    expect(overflowX).toBe('auto')
  })
})
