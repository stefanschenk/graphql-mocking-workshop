import { expect, test } from '@playwright/test';

test('View Catalog Land types', async ({ page }) => {
  /**
   * We are using `page.route` to intercept requests to `c*.scryfall.com`
   * When we start with mocking request, or data, the request will fail nonetheless.
   * We are going to use `route.abort` because we are not interested in pictures that are
   * returned via this route, and we do not want to return a mock response to these requests.
   */
  await page.route(/c\d.scryfall.com/, (route, request) => {
    route.abort('blockedbyclient');
  });

  await page.goto('http://localhost:3000');

  await page.locator('.ant-menu-item', { hasText: 'Catalog' }).click();
  await page.locator('.ant-collapse-item', { hasText: 'Land types' }).click();

  await expect(page.locator('.ant-tag')).toHaveCount(13);
  await expect(page.locator('.ant-tag').nth(0)).toHaveText('Desert');
  await expect(page.locator('.ant-tag').nth(1)).toHaveText('Forest');
});
