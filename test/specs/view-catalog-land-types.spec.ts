import { expect, test } from '../base.test';
import { addLandTypes, removeLandTypes } from '../store/catalogLandTypes/slice';

test('View Catalog Land types', async ({ page, store }) => {
  await store.dispatch(addLandTypes(['savanne', 'oerwoud']));

  await page.goto('http://localhost:3000');

  await page.locator('.ant-menu-item', { hasText: 'Catalog' }).click();
  await page.locator('.ant-collapse-item', { hasText: 'Land types' }).click();

  await expect(page.locator('.ant-tag')).toHaveCount(2);
  await expect(page.locator('.ant-tag').nth(0)).toHaveText('savanne');
  await expect(page.locator('.ant-tag').nth(1)).toHaveText('oerwoud');

  await store.dispatch(removeLandTypes(['savanne']));

  await page.locator('button', { hasText: 'refresh' }).click();

  await expect(page.locator('.ant-tag')).toHaveCount(1);
  await expect(page.locator('.ant-tag').nth(0)).toHaveText('oerwoud');

  await store.dispatch(addLandTypes(['grasland', 'duinen', 'bos', 'moeras', 'bergen']));

  await page.locator('button', { hasText: 'refresh' }).click();

  await expect(page.locator('.ant-tag')).toHaveCount(6);
  await expect(page.locator('.ant-tag').nth(0)).toHaveText('oerwoud');
  await expect(page.locator('.ant-tag').nth(1)).toHaveText('grasland');
  await expect(page.locator('.ant-tag').nth(2)).toHaveText('duinen');
  await expect(page.locator('.ant-tag').nth(3)).toHaveText('bos');
  await expect(page.locator('.ant-tag').nth(4)).toHaveText('moeras');
  await expect(page.locator('.ant-tag').nth(5)).toHaveText('bergen');
});
