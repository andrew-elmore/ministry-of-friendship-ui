const { chromium } = require('playwright');
const { signInNewClerkUser, enlist, deleteClerkUser } = require('./tests/e2e/helpers/clerkUsers.js');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const gamertag = `QAInspect${Date.now()}`;

  console.log(':~: Step 1: Creating account');
  const clerkUser = await signInNewClerkUser(page, 'http://localhost:8081', 'qa-inspect');
  await enlist(page, gamertag);

  console.log(':~: Waiting for account creation...');
  await page.waitForTimeout(3000);

  console.log(':~: Step 2: Navigating to /squad/add');
  await page.goto('http://localhost:8081/squad/add');
  await page.waitForTimeout(2000);

  console.log(':~: Current URL:', page.url());

  await page.screenshot({ path: '/tmp/squad-add-authenticated.png', fullPage: true });
  console.log(':~: Screenshot saved to /tmp/squad-add-authenticated.png');

  console.log(':~: Step 3: Inspecting friend-code-input');

  const allInputs = await page.locator('input').all();
  console.log(':~: Found', allInputs.length, 'input elements on page');

  for (let i = 0; i < allInputs.length; i++) {
    const input = allInputs[i];
    const name = await input.getAttribute('name');
    const testId = await input.getAttribute('data-testid');
    const type = await input.getAttribute('type');
    const placeholder = await input.getAttribute('placeholder');
    console.log(':~:   Input', i + 1, ':', { name, testId, type, placeholder });
  }

  const allTestIds = await page.locator('[data-testid]').all();
  console.log(':~: Found', allTestIds.length, 'elements with data-testid');

  for (let i = 0; i < allTestIds.length; i++) {
    const el = allTestIds[i];
    const testId = await el.getAttribute('data-testid');
    const tagName = await el.evaluate(el => el.tagName);
    console.log(':~:   Element', i + 1, ':', { tagName, testId });
  }

  console.log(':~: Step 4: Specific search for friend-code-input');

  const friendCodeByTestId = await page.locator('[data-testid="friend-code-input"]').count();
  console.log(':~: Elements matching [data-testid="friend-code-input"]:', friendCodeByTestId);

  if (friendCodeByTestId > 0) {
    const element = page.locator('[data-testid="friend-code-input"]').first();
    const tagName = await element.evaluate(el => el.tagName);
    const isFillable = await element.evaluate(el => {
      return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.hasAttribute('contenteditable');
    });
    console.log(':~: friend-code-input element:', { tagName, isFillable });

    const outerHTML = await element.evaluate(el => el.outerHTML);
    console.log(':~: friend-code-input HTML:', outerHTML);
  }

  const friendCodeByName = await page.locator('input[name="friendCode"]').count();
  console.log(':~: Elements matching input[name="friendCode"]:', friendCodeByName);

  if (friendCodeByName > 0) {
    const input = page.locator('input[name="friendCode"]').first();
    const testId = await input.getAttribute('data-testid');
    console.log(':~: input[name="friendCode"] has data-testid:', testId);

    const parent = await input.evaluateHandle(el => el.parentElement);
    const parentTestId = await parent.evaluate(el => el.getAttribute('data-testid'));
    const parentClass = await parent.evaluate(el => el.className);
    const parentTag = await parent.evaluate(el => el.tagName);
    console.log(':~: Parent:', { parentTag, parentClass, parentTestId });

    const parentHTML = await parent.evaluate(el => el.outerHTML);
    console.log(':~: Parent HTML:', parentHTML);
  }

  await page.waitForTimeout(5000);
  await browser.close();
  await deleteClerkUser(clerkUser);
})();
