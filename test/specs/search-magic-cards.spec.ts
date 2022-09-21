import { test } from '../base.test';
import { addSearchResult } from '../store/set/slice';

test('Search Magic cards', async ({ page, store }) => {
  await store.dispatch(addSearchResult({ query: 'tutor', result: [{ name: 'An Excellent Tutor' }] }));

  await page.goto('http://localhost:3000');

  await page.locator('input[name="search"]').fill('tutor');
  await page.locator('input[name="search"]').press('Enter');
  await page.pause();
});
