const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const email = `qa-test-fill-${Date.now()}@test.com`;
  const gamertag = `QATestFill${Date.now()}`;
  const password = 'TestPass123!';

  console.log(':~: Creating account');
  await page.goto('http://localhost:8081/signup');
  await page.waitForTimeout(1000);

  await page.locator('[data-testid="signup-email"]').fill(email);
  await page.locator('[data-testid="signup-gamertag"]').fill(gamertag);
  await page.locator('[data-testid="signup-password"]').fill(password);
  await page.locator('[data-testid="signup-confirm-password"]').fill(password);
  await page.locator('[data-testid="signup-submit"]').click();

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
})();
