import { test, expect } from '@playwright/test';
import { signInNewClerkUser, enlist, deleteClerkUser } from './helpers/clerkUsers.js';

test.describe('Clerk Authentication Flow', () => {
  let clerkUser = null;

  test.afterEach(async () => {
    await deleteClerkUser(clerkUser);
    clerkUser = null;
  });

  test('signed out visitors see the Clerk sign in wall', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-testid="sign-in-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="sign-up-button"]')).toBeVisible();
  });

  test('a new Clerk user picks a gamer tag and reaches the dashboard', async ({ page, baseURL }) => {
    clerkUser = await signInNewClerkUser(page, baseURL, 'auth-e2e');

    await enlist(page, `Diver${Date.now()}`);

    await expect(page.locator('text=Start A Squad')).toBeVisible();
  });

  test('user can sign out', async ({ page, baseURL }) => {
    clerkUser = await signInNewClerkUser(page, baseURL, 'auth-e2e');
    await enlist(page, `Diver${Date.now()}`);

    await page.goto('/profile');
    await page.locator('[data-testid="sign-out-button"]').click();

    await expect(page.locator('[data-testid="sign-in-button"]')).toBeVisible();
  });

});
