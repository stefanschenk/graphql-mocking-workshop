import { expect, test } from '@playwright/test';

test('View Catalog Land types', async ({ page }) => {
  /**
   * We gebruiken hier een page.route om requests naar c*.scryfall.com af te vangen
   * Als we data mocken, zullen dit requests zijn die toch gaan falen.
   * We gebruiken `route.abort`, omdat we niet geïnteresseerd zijn in afbeeldingen die via
   * deze route terug zouden komen en we willen ook geen mock response teruggeven op deze requests.
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
