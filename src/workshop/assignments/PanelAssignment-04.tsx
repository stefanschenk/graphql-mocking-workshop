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
          afgerond
        </Checkbox>
      }
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Opdracht',
            key: '1',
            children: (
              <>
                <Paragraph>
                  Eén van de issue die ik ben tegengekomen, is dat de Apollo server in zijn eigen proces draait.
                  <br />
                  Eenmaal gestart, dan kan je geen mutaties doen aan de gesimuleerde data die de server kan terug geven.
                  <br />
                  Terwijl je juist de flexibiliteit wilt hebben om je data te manipuleren al naar gelang wat je testcase
                  nodig heeft.
                </Paragraph>
                <Paragraph>
                  Wat we in deze opdracht gaan doen, is de Apollo server niet meer starten als standalone server. Maar
                  we gaan er een functie van maken die voor (elke) test een nieuwe instantie maakt als in-memory server.
                  <br />
                  We gebruiken een testtool (<Text italic>Playwright</Text>) die de mogelijkheid heeft om network
                  requests te monitoren en responses aan te passen. Hiermee gaan we de GraphQL requests die voorbij
                  komen afvangen en de GraphQL operatie direct op de in-memory server uitvoeren.
                  <br />
                  Het resultaat van de GraphQL operatie wordt vervolgens als response geretourneerd naar de frontend.
                </Paragraph>
                <Paragraph>
                  De functie die hiervoor beschikbaar is op je Apollo server instantie is:{' '}
                  <Text code>executeOperation</Text>
                </Paragraph>
                <Paragraph>
                  De methode die we gaan gebruiken binnen Playwright is{' '}
                  <a
                    href="https://playwright.dev/docs/network#modify-requests"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    requests wijzigen met page.route
                  </a>
                </Paragraph>
                <Paragraph>
                  <ul>
                    <li>
                      In <Text code>apollo-server.ts</Text>, exporteer een methode die een nieuwe instantie van een{' '}
                      <Text code>ApolloServer</Text> retourneert
                      <br />
                    </li>
                    <li>
                      Verwijder de aanroep naar <Text code>server.listen</Text>
                    </li>
                    <li>
                      Pas <Text code>view-catalog-land-types.spec.ts</Text> aan
                      <li>maak een nieuwe instantie van Apollo server</li>
                      <li>
                        voeg een <Text code>page.route</Text> die GraphQL requests kan afvangen
                        <br />
                        tip: <Text code>executeOperation</Text> verwacht een object van het type{' '}
                        <Text code>GraphQLRequest</Text>, je kan de body uit het afgevangen request gebruiken om dit
                        object te maken
                      </li>
                      <li>
                        Maak gebruik van de <Text code>executeOperation</Text> methode
                      </li>
                      <li>
                        Gebruik <Text code>route.fulfill</Text> om het resultaat van de{' '}
                        <Text code>executeOperation</Text> als response te versturen
                      </li>
                    </li>
                  </ul>
                </Paragraph>

                <Paragraph>
                  Deze opdracht is afgerond als je succesvol de testcase{' '}
                  <Text strong>view-catalog-land-types.spec.ts</Text> kan draaien
                  <br />
                  Je kan een enkele Playwright test starten met het volgende commando:{' '}
                  <Text code>{`npx playwright test <bestandsnaam> --headed`}</Text>
                </Paragraph>

                <Checkbox
                  checked={solutionEnabled}
                  onChange={(e: CheckboxChangeEvent) => setSolutionEnabled(e.target.checked)}
                >
                  toon de oplossing
                </Checkbox>
                <Divider plain />
                <Button onClick={onClick} size="small" shape="round" type="primary">
                  Next
                </Button>
              </>
            ),
          },
          {
            label: 'Meer info',
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
            label: 'Oplossing',
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
import { buildClientSchema } from 'graphql';
import { ApolloServer } from 'apollo-server';

const introspectionResult = require('../graphql.schema.json');

const schema = buildClientSchema(introspectionResult);

const resolvers = {
  Query: () => ({
    catalogLandTypes: () => {
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
