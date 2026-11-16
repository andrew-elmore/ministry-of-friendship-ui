const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(':~: Navigating to http://localhost:8081/squad/add');
  await page.goto('http://localhost:8081/squad/add');

  await page.waitForTimeout(3000);

  console.log(':~: Current URL:', page.url());

  await page.screenshot({ path: '/tmp/squad-add-navigation.png', fullPage: true });
  console.log(':~: Screenshot saved to /tmp/squad-add-navigation.png');

  const bodyHTML = await page.content();
  console.log(':~: Page HTML length:', bodyHTML.length);

  const allInputs = await page.locator('input').all();
  console.log(':~: Found', allInputs.length, 'input elements');

  for (let i = 0; i < allInputs.length; i++) {
    const input = allInputs[i];
    const name = await input.getAttribute('name');
    const testId = await input.getAttribute('data-testid');
    const type = await input.getAttribute('type');
    console.log(':~:   Input', i + 1, ':', { name, testId, type });
  }

  const allDivs = await page.locator('[data-testid]').all();
  console.log(':~: Found', allDivs.length, 'elements with data-testid');

  for (let i = 0; i < allDivs.length; i++) {
    const div = allDivs[i];
    const testId = await div.getAttribute('data-testid');
    const tagName = await div.evaluate(el => el.tagName);
    console.log(':~:   Element', i + 1, ':', { tagName, testId });
  }

  await page.waitForTimeout(5000);
  await browser.close();
})();
