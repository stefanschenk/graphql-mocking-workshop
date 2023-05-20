import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, CollapsePanelProps, Divider, Tabs, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

const PanelAssignment05: React.FC<
  CollapsePanelProps & {
    setActiveKey: (value: string | string[] | ((val: string | string[]) => string | string[])) => void;
  }
> = props => {
  const [solutionEnabled, setSolutionEnabled] = useLocalStorage('workshop:solutionEnabled:05', false);
  const [finished, setFinished] = useLocalStorage('workshop:assignment:05', false);

  const onClick = () => {
    // e.stopPropagation();
    setFinished(true);
    props.setActiveKey('assignment:06');
  };

  return (
    <Panel
      {...props}
      extra={
        <Checkbox checked={finished} disabled>
          completed
        </Checkbox>
      }
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Assignment',
            key: '1',
            children: (
              <>
                <Paragraph>
                  So far, we have been working with fixed data in our resolvers. What we are going to do now is adding a{' '}
                  <a
                    href="https://redux-toolkit.js.org/introduction/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    redux store
                  </a>{' '}
                  in which we can store our simulated data and manipulate it.
                </Paragraph>
                <Paragraph>
                  To achieve this, Redux Toolkit has been added to the project.
                  <br />
                  In the <Text strong>store</Text> directory, you will find a <Text code>store.ts</Text> file, and there
                  is an example Redux setup created for <Text code>catalogLandTypes</Text>.<br />
                  Based on this example, you can create <Text italic>reducers</Text> and <Text italic>selectors</Text>{' '}
                  for other queries that can be executed.
                </Paragraph>
                <Paragraph>
                  A Redux store is composed of multiple <Text italic>slices</Text>. A <Text italic>slice</Text>{' '}
                  describes what can be stored in the store, determines the initial state, and defines{' '}
                  <Text italic>reducers</Text>.<br />
                  Reducers are methods used to retrieve information from the <Text italic>slice</Text> or add and modify
                  data within it.
                </Paragraph>
                <Paragraph>
                  With the <Text italic>store</Text>, <Text italic>reducers</Text>, and <Text italic>selectors</Text>{' '}
                  that have been described for <Text code>catalogLandTypes</Text>, you can now modify{' '}
                  <Text code>apollo-server.ts</Text> and <Text code>view-catalog-land-types.spec.ts</Text> to make use
                  of the Redux store.
                  <br />
                  <br />
                  To incorporate the Redux store into the apollo-server.ts file and the catalogLandTypes resolver, you
                  can follow these steps:
                  <ul>
                    <li>
                      Modify the <Text code>apolloServer</Text> function to accept the Redux store as a parameter
                    </li>
                    <li>
                      Change the <Text code>resolvers</Text> object into a function that accepts the store as a
                      parameter and returns the resolvers object
                    </li>
                    <li>
                      Until now the <Text code>catalogLandTypes</Text> resolver simply returned an object with a few
                      fixed values.
                      <br />
                      Update the <Text code>catalogLandTypes</Text> resolver to retrieve the data from the Redux store
                      using a selector (<Text code>getCatalogLandTypes</Text>)
                      <br />
                      <Text italic>
                        A selector expects a state as function parameter. With <Text code>store.getState()</Text> you
                        will get the current state to pass to the selector.
                      </Text>
                    </li>
                  </ul>
                  By passing the Redux store as a parameter and using selectors to retrieve the data, you can integrate
                  the Redux store into the Apollo server and ensure that the resolvers access the updated state from the
                  store.
                </Paragraph>
                <Paragraph>
                  Now make a few changes to <Text code>view-catalog-land-types.spec.ts</Text>:
                  <ul>
                    <li>
                      Import the Redux store and actions at the beginning of the test file and pass the store as
                      argument when you create a new <Text code>apolloServer</Text> instance.
                      <br />
                      <Text italic>
                        If you run the test now, you will see that it returns a response without any land types. This is
                        because of the <Text code>initialState</Text> of the store.
                      </Text>
                    </li>
                    <li>
                      Make use of the created <Text italic>reducers</Text> to add or modify test data during the test
                      <br />
                      For instance use <Text code>addLandTypes</Text> and <Text code>removeLandTypes</Text> on multiple
                      locations within the testcase to add land types to the current state. Or remove land types from
                      the state. When returning a response to the frontend, this will now use the current state to
                      return the intended land types.
                    </li>
                  </ul>
                </Paragraph>
                <Paragraph>
                  A reducer is not a function that you can directly invoke; it is an <Text italic>action</Text> that you{' '}
                  <Text strong>must</Text> execute using the <Text code>store.dispatch</Text> method.
                  <br />
                  For example:
                  <Text code>store.dispatch(addLandTypes(payload))</Text>
                  <br />
                  In this case the payload would be an array of land types (string)
                </Paragraph>

                <Paragraph>
                  This assignment is completed when you successfully run the Playwright testcase{' '}
                  <Text code>view-catalog-land-types.spec.ts</Text> and you have added and/or modified the data during
                  the test.
                  <br />
                  Now create additional <Text italic>slices en selectors</Text> and use these to extend the store.
                  <br />
                  You can now import and use your selectors in your <Text code>apollo-server.ts</Text>.
                  <br />
                  Create additional testcases to also test the other pages in this web application.
                  <br />
                  Remember to dispatch actions using store.dispatch to update the state of your slice.
                </Paragraph>
                <Paragraph>
                  View <Text strong>More info</Text> for an example on how to extend the Playwright{' '}
                  <Text code>test</Text> object to define the <Text code>route</Text> once and reuse it for multiple
                  testcases.
                </Paragraph>

                <Checkbox
                  checked={solutionEnabled}
                  onChange={(e: CheckboxChangeEvent) => setSolutionEnabled(e.target.checked)}
                >
                  show the solution
                </Checkbox>
                <Divider plain />
                <Button onClick={onClick} size="small" shape="round" type="primary">
                  Next
                </Button>
              </>
            ),
          },
          {
            label: 'More info',
            key: '2',
            children: (
              <>
                <Paragraph>
                  <Divider orientation="left">
                    <Text
                      style={{ fontSize: '0.9rem' }}
                      copyable={{
                        text: extraInfoTestExtend,
                        icon: [
                          <Button icon={<CopyOutlined />} size="small" shape="round" type="primary">
                            copy
                          </Button>,
                          <Button icon={<CheckOutlined />} size="small" shape="round" type="primary">
                            copied
                          </Button>,
                        ],
                      }}
                      strong
                    >
                      base.test.ts (extend Playwright test)&nbsp;&nbsp;
                    </Text>
                  </Divider>
                  <SyntaxHighlighter
                    customStyle={{ border: '1px lightgrey solid', fontSize: '12px' }}
                    lineNumberStyle={{ color: 'black', opacity: '0.4' }}
                    language="typescript"
                    showLineNumbers
                    style={docco}
                  >
                    {extraInfoTestExtend.trim()}
                  </SyntaxHighlighter>
                  <Divider orientation="left">
                    <Text
                      style={{ fontSize: '0.9rem' }}
                      copyable={{
                        text: extraInfoTestcase,
                        icon: [
                          <Button icon={<CopyOutlined />} size="small" shape="round" type="primary">
                            copy
                          </Button>,
                          <Button icon={<CheckOutlined />} size="small" shape="round" type="primary">
                            copied
                          </Button>,
                        ],
                      }}
                      strong
                    >
                      view-catalog-land-types.spec.ts&nbsp;&nbsp;
                    </Text>
                  </Divider>
                  <SyntaxHighlighter
                    customStyle={{ border: '1px lightgrey solid', fontSize: '12px' }}
                    lineNumberStyle={{ color: 'black', opacity: '0.4' }}
                    language="typescript"
                    showLineNumbers
                    style={docco}
                  >
                    {extraInfoTestcase.trim()}
                  </SyntaxHighlighter>
                </Paragraph>
              </>
            ),
          },
          {
            label: 'Solution',
            key: '3',
            disabled: !solutionEnabled,
            children: (
              <>
                <Divider orientation="left">
                  <Text
                    style={{ fontSize: '0.9rem' }}
                    copyable={{
                      text: solutionApolloServer,
                      icon: [
                        <Button icon={<CopyOutlined />} size="small" shape="round" type="primary">
                          copy
                        </Button>,
                        <Button icon={<CheckOutlined />} size="small" shape="round" type="primary">
                          copied
                        </Button>,
                      ],
                    }}
                    strong
                  >
                    apollo-server.ts&nbsp;&nbsp;
                  </Text>
                </Divider>
                <SyntaxHighlighter
                  customStyle={{ border: '1px lightgrey solid', fontSize: '12px' }}
                  lineNumberStyle={{ color: 'black', opacity: '0.4' }}
                  language="typescript"
                  showLineNumbers
                  style={docco}
                >
                  {solutionApolloServer.trim()}
                </SyntaxHighlighter>
                <Divider orientation="left">
                  <Text
                    style={{ fontSize: '0.9rem' }}
                    copyable={{
                      text: solutionTestCase,
                      icon: [
                        <Button icon={<CopyOutlined />} size="small" shape="round" type="primary">
                          copy
                        </Button>,
                        <Button icon={<CheckOutlined />} size="small" shape="round" type="primary">
                          copied
                        </Button>,
                      ],
                    }}
                    strong
                  >
                    view-catalog-land-types.spec.ts&nbsp;&nbsp;
                  </Text>
                </Divider>
                <SyntaxHighlighter
                  customStyle={{ border: '1px lightgrey solid', fontSize: '12px' }}
                  lineNumberStyle={{ color: 'black', opacity: '0.4' }}
                  language="typescript"
                  showLineNumbers
                  style={docco}
                >
                  {solutionTestCase.trim()}
                </SyntaxHighlighter>
                <Paragraph />
                <Divider plain />
                <Button onClick={onClick} size="small" shape="round" type="primary">
                  Next
                </Button>
              </>
            ),
          },
        ]}
      />
    </Panel>
  );
};

const solutionApolloServer = `
/**
 * This file will be used in all assignments - it will contain all the code for your mock Apollo server
 */
import { ApolloServer } from 'apollo-server';
import { buildClientSchema } from 'graphql';
import { DeepPartial } from 'ts-essentials';
import { GqlCatalogType } from '../src/graphql-schema.generated';
import { getCatalogLandTypes } from './store/catalogLandTypes/selectors';
import { TestDataStore } from './store/store';

const introspectionResult = require('../graphql.schema.json');

const schema = buildClientSchema(introspectionResult);

/**
 * Resolver functions are passed four arguments: parent, args, context, and info (in that order).
 * @param store
 */
const resolvers = (store: TestDataStore) => ({
  Query: () => ({
    catalogLandTypes: (): DeepPartial<GqlCatalogType> => {
      return getCatalogLandTypes(store.getState());
    },
  }),
});

export const apolloServer = (store: TestDataStore) =>
  new ApolloServer({
    schema,
    mocks: resolvers(store),
    mockEntireSchema: false,
  });
`;

const solutionTestCase = `
import { GraphQLRequest } from '@apollo/client';
import { expect, test } from '@playwright/test';
import { apolloServer } from '../apollo-server';
import { addLandTypes, removeLandTypes } from '../store/catalogLandTypes/slice';
import { store } from '../store/store';

const server = apolloServer(store);

test('View Catalog Land types', async ({ page }) => {
  await page.route(/c\\d.scryfall.com/, (route, request) => {
    route.abort('blockedbyclient');
  });

  await page.route(/\\/graphql\\/data/, async (route, request) => {
    const body = request.postDataJSON();
    const graphqlRequest: GraphQLRequest = {
      ...body,
    };

    const result = await server.executeOperation(graphqlRequest);

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(result),
    });
  });

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
`;

const extraInfoTestExtend = `
import { GraphQLRequest } from '@apollo/client';
import { expect, test as base } from '@playwright/test';
import { apolloServer } from './apollo-server';
import { store, TestDataStore } from './store/store';

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

      await context.route(/c\\d.scryfall.com/, (route, request) => {
        route.abort('blockedbyclient');
      });

      await context.route(/\\/graphql\\/data/, async (route, request) => {
        const body = request.postDataJSON();
        const graphqlRequest: GraphQLRequest = {
          ...body,
        };

        const result = await server.executeOperation(graphqlRequest);

        route.fulfill({
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
`;

const extraInfoTestcase = `
import { expect, test } from '../base.test';
import { addLandTypes, removeLandTypes } from '../store/catalogLandTypes/slice';

test('View Catalog Land types', async ({ page, store }) => {
  await page.goto('http://localhost:3000');

  await page.locator('.ant-menu-item', { hasText: 'Catalog' }).click();
  await page.locator('.ant-collapse-item', { hasText: 'Land types' }).click();

  await expect(page.locator('.ant-tag')).toHaveCount(3);
  await expect(page.locator('.ant-tag').nth(0)).toHaveText('weiland');
  await expect(page.locator('.ant-tag').nth(1)).toHaveText('steppe');
  await expect(page.locator('.ant-tag').nth(2)).toHaveText('woestijn');
});
`;

export default PanelAssignment05;
