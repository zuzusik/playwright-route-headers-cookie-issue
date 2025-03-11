import { test, expect } from '@playwright/test';

async function setsAndClearsCookie(page) {
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Set cookie' }).click();

  await expect(page.getByText('"test-cookie": "test-value"')).toBeVisible();

  await page.getByRole('link', { name: 'Clear cookie' }).click();

  await expect(page.getByText('"test-cookie": "test-value"')).not.toBeVisible();
}

test('Sets and clears cookie - with interceptor touching headers', async ({ page }) => {
  await page.route('**', (route) => {
    return route.continue({headers: route.request().headers()});
  });

  await setsAndClearsCookie(page);
});

test('Sets and clears cookie - with interceptor not touching headers', async ({ page }) => {
  await page.route('**', (route) => {
    return route.continue();
  });

  await setsAndClearsCookie(page);
});

test('Sets and clears cookie - without interceptor', async ({ page }) => {
  await setsAndClearsCookie(page);
})
