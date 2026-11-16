const { chromium } = require('playwright');
const { signInNewClerkUser, enlist, deleteClerkUser } = require('./tests/e2e/helpers/clerkUsers.js');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const gamertag = `QATestFill${Date.now()}`;

  console.log(':~: Creating account');
  const clerkUser = await signInNewClerkUser(page, 'http://localhost:8081', 'qa-test-fill');
  await enlist(page, gamertag);

  console.log(':~: Waiting for account creation...');
  await page.waitForTimeout(3000);

  console.log(':~: Navigating to /squad/add');
  await page.goto('http://localhost:8081/squad/add');
  await page.waitForTimeout(2000);

  console.log(':~: Current URL:', page.url());

  console.log(':~: Attempting to fill friend-code-input with value "TEST123"');

  try {
    await page.locator('[data-testid="friend-code-input"]').fill('TEST123');
    console.log(':~: SUCCESS: friend-code-input was filled');

    const value = await page.locator('[data-testid="friend-code-input"]').inputValue();
    console.log(':~: Input value after fill:', value);

    await page.screenshot({ path: '/tmp/friend-code-filled.png', fullPage: true });
    console.log(':~: Screenshot saved to /tmp/friend-code-filled.png');
  } catch (error) {
    console.log(':~: ERROR: Failed to fill friend-code-input');
    console.log(':~: Error message:', error.message);

    await page.screenshot({ path: '/tmp/friend-code-error.png', fullPage: true });
    console.log(':~: Error screenshot saved to /tmp/friend-code-error.png');
  }

  await page.waitForTimeout(5000);
  await browser.close();
  await deleteClerkUser(clerkUser);
})();
