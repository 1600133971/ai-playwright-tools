import { test, expect } from '../extends/attachment';

test.use({
  timeout: 1000,
  locale: 'en-US',
  expect: { 
    timeout: 1000 
  },
  actionTimeout: 1000,
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev');

  await page.getByRole('button', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.only('Click me link', async ({ page }) => {
  await page.goto("http://127.0.0.1:3000");

  await page.getByRole('link', { name: 'Click me' }).click();
});
