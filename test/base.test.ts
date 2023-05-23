import { GraphQLRequest } from '@apollo/client';
import { expect, test as base } from '@playwright/test';
import { apolloServer } from './apollo-server';
import { store, TestDataStore } from './store/store';
import assert from 'assert';

/**
 * The _test_ class from Playwright is extended with fixtures (https://playwright.dev/docs/test-fixtures)
 * Execution order (https://playwright.dev/docs/test-fixtures#execution-order)
 */
export const test = base.extend<{ setupTest: void; store: TestDataStore }>({
  store,

  /**
   * This fixture runs for every _test_
   */
  setupTest: [
    async ({ context }, use) => {
      const server = apolloServer(store);

      await context.route(/c\d.scryfall.com/, (route, request) => {
        route.abort('blockedbyclient');
      });

      await context.route(/\/graphql\/data/, async (route, request) => {
        const body = request.postDataJSON();
        const graphqlRequest: GraphQLRequest = {
          ...body,
        };

        const response = await server.executeOperation(graphqlRequest);

        assert(response.body.kind === 'single');

        const result = response.body.singleResult;

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(result),
        });
      });

      await use();
    },
    { scope: 'test', auto: true },
  ],
});

export { expect } from '@playwright/test';
