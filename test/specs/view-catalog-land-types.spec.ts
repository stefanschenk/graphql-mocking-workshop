import { expect, test } from '@playwright/test';

test('View Catalog Land types', async ({ page }) => {
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
