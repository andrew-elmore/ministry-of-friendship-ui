import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user can login successfully', async ({ page }) => {
    await page.fill('[name="username"]', 'testuser');
    await page.fill('[name="password"]', 'testpass123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('user sees error with invalid credentials', async ({ page }) => {
    await page.fill('[name="username"]', 'baduser');
    await page.fill('[name="password"]', 'badpass');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('user can logout', async ({ page }) => {
    await page.fill('[name="username"]', 'testuser');
    await page.fill('[name="password"]', 'testpass123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);

    await page.click('button[aria-label="User menu"]');
    await page.click('text=Logout');

    await expect(page).toHaveURL('/');
  });

});
