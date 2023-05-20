import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, CollapsePanelProps, Divider, Tabs, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

const PanelAssignment04: React.FC<
  CollapsePanelProps & {
    setActiveKey: (value: string | string[] | ((val: string | string[]) => string | string[])) => void;
  }
> = props => {
  const [solutionEnabled, setSolutionEnabled] = useLocalStorage('workshop:solutionEnabled:04', false);
  const [finished, setFinished] = useLocalStorage('workshop:assignment:04', false);

  const onClick = () => {
    // e.stopPropagation();
    setFinished(true);
    props.setActiveKey('assignment:05');
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
                  One of the issues I encountered is that the Apollo server runs in its own process.
                  <br />
                  Once it's started, you cannot make mutations to the simulated data that the server can return.
                  <br />
                  However, you want the flexibility to manipulate your data as needed for your test cases.
                </Paragraph>
                <Paragraph>
                  In this task, we will no longer start the Apollo server as a standalone server. Instead, we will turn
                  it into a function that creates a new instance as an in-memory server for each test.
                  <br />
                  We will use a testing tool (<Text italic>Playwright</Text>) that has the ability to monitor and
                  intercept network requests and can modify responses. With this tool, we will intercept the outgoing
                  GraphQL requests and execute the GraphQL operation directly on the in-memory server.
                  <br />
                  The result of the GraphQL operation will then be returned as a response to the frontend.
                </Paragraph>
                <Paragraph>
                  The function available on your Apollo server instance for this purpose is called:{' '}
                  <Text code>executeOperation</Text>
                </Paragraph>
                <Paragraph>
                  The method we will use within Playwright is{' '}
                  <a
                    href="https://playwright.dev/docs/network#modify-requests"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    modify requests with page.route
                  </a>
                </Paragraph>
                <Paragraph>
                  Execute the following steps:
                  <ul>
                    <li>
                      In <Text code>apollo-server.ts</Text>, export a method that returns a new instance of an{' '}
                      <Text code>ApolloServer</Text>.
                      <br />
                    </li>
                    <li>
                      Remove the call to <Text code>server.listen</Text>
                    </li>
                    <li>
                      Modify <Text code>view-catalog-land-types.spec.ts</Text>:
                      <li>Create a new instance of Apollo server</li>
                      <li>
                        Add a <Text code>page.route</Text>
                        to intercept GraphQL requests.
                        <br />
                        Note: <Text code>executeOperation</Text> expects an object of type{' '}
                        <Text code>GraphQLRequest</Text>. You can use the body from the intercepted request to create
                        this object.
                      </li>
                      <li>
                        Utilize the <Text code>executeOperation</Text> method
                      </li>
                      <li>
                        Use <Text code>route.fulfill</Text> to send the result of <Text code>executeOperation</Text>
                        as the response.
                      </li>
                    </li>
                  </ul>
                </Paragraph>
                <Paragraph>
                  This assignment is completed when you can successful run the testcase{' '}
                  <Text strong>view-catalog-land-types.spec.ts</Text>
                  <br />
                  <br />
                  You can start a single Playwright test with the following command:{' '}
                  <Text code>{`npx playwright test <bestandsnaam> --headed`}</Text>
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
            disabled: true,
            children: (
              <>
                <Paragraph>
                  <Text strong>More info</Text>
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
                      text: solutionTestcase,
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
                  {solutionTestcase.trim()}
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

const introspectionResult = require('../graphql.schema.json');

const schema = buildClientSchema(introspectionResult);

const resolvers = {
  Query: () => ({
    catalogLandTypes: (): DeepPartial<GqlCatalogType> => {
      return {
        data: ['weiland', 'steppe', 'woestijn'],
      };
    },
  }),
};

export const apolloServer = () =>
  new ApolloServer({
    schema,
    mocks: resolvers,
    mockEntireSchema: false,
  });
`;

const solutionTestcase = `
import { GraphQLRequest } from '@apollo/client';
import { expect, test } from '@playwright/test';
import { apolloServer } from '../apollo-server';

const server = apolloServer();

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

  await page.goto('http://localhost:3000');

  await page.locator('.ant-menu-item', { hasText: 'Catalog' }).click();
  await page.locator('.ant-collapse-item', { hasText: 'Land types' }).click();

  await expect(page.locator('.ant-tag')).toHaveCount(3);
  await expect(page.locator('.ant-tag').nth(0)).toHaveText('weiland');
  await expect(page.locator('.ant-tag').nth(1)).toHaveText('steppe');
  await expect(page.locator('.ant-tag').nth(2)).toHaveText('woestijn');
});
`;

export default PanelAssignment04;
