import 'dotenv/config';
import { randomUUID } from 'crypto';
import { createClerkClient } from '@clerk/backend';
import { clerk, clerkSetup } from '@clerk/testing/playwright';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

/**
 * Creates a Clerk test user, signs them in on the page through Clerk's testing ticket flow, and returns the
 * Clerk user so the caller can delete it afterwards.
 * @param {import('@playwright/test').Page} page
 * @param {string} baseURL
 * @param {string} label Used to make the test email address readable.
 * @returns {Promise<{ id: string }>}
 */
export async function signInNewClerkUser(page, baseURL, label) {
    if (!process.env.CLERK_TESTING_TOKEN) {
        await clerkSetup();
    }

    const emailAddress = `${label}-${Date.now()}+clerk_test@example.com`;
    const user = await clerkClient.users.createUser({
        emailAddress: [emailAddress],
        password: `Mof-${randomUUID()}`,
    });

    await page.goto(baseURL);
    await clerk.signIn({ page, emailAddress });
    await page.goto(baseURL);
    return user;
}

/**
 * Fills in the first-run gamer tag form shown to a Clerk user without a Profile.
 * @param {import('@playwright/test').Page} page
 * @param {string} gamerTag
 */
export async function enlist(page, gamerTag) {
    await page.locator('[data-testid="profile-gamertag"]').fill(gamerTag);
    await page.locator('[data-testid="profile-submit"]').click();
    await page.locator('[data-testid="profile-gamertag"]').waitFor({ state: 'detached', timeout: 15000 });
}

/**
 * Deletes a Clerk test user created by signInNewClerkUser.
 * @param {{ id: string }|null} user
 */
export async function deleteClerkUser(user) {
    if (user) {
        await clerkClient.users.deleteUser(user.id);
    }
}
