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
                  Tot nu toe hebben we steeds met vaste data gewerkt in onze resolver(s). Wat we nu gaan doen is{' '}
                  <a
                    href="https://redux-toolkit.js.org/introduction/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    redux store
                  </a>{' '}
                  toevoegen waarin we onze gesimuleerde data kunnen opslaan en manipuleren
                </Paragraph>
                <Paragraph>
                  Om dit te kunnen doen is Redux Toolkit toegevoegd aan het project.
                  <br />
                  In de directory <Text strong>store</Text> staat een <Text code>store.ts</Text> bestand en is er een
                  voorbeeld Redux setup gemaakt voor <Text code>catalogLandTypes</Text>.<br />
                  Op basis van dit voorbeeld kan je <Text italic>Reducers</Text> en <Text italic>Selectors</Text> maken
                  voor de andere queries die uitgevoerd kunnen worden.
                </Paragraph>
                <Paragraph>
                  Een Redux store is opgebouwd uit meerdere <Text italic>slices</Text>. Een <Text italic>slice</Text>{' '}
                  beschrijft wat er opgeslagen kan worden in de store, bepaalt de initiële vulling en definieert{' '}
                  <Text italic>reducers</Text>,<br /> methodes die je gebruikt om informatie op te halen uit de{' '}
                  <Text italic>slice</Text> of toe te voegen en te wijzigen.
                </Paragraph>
                <Paragraph>
                  Met de <Text italic>store</Text>, <Text italic>reducers</Text> en <Text italic>selectors</Text> die
                  zijn beschreven voor <Text code>catalogLandTypes</Text> kan je nu de{' '}
                  <Text code>apollo-server.ts</Text> en <Text code>view-catalog-land-types.spec.ts</Text> zo aanpassen
                  dat deze gebruik gaan maken van de Redux store.
                  <ul>
                    <li>
                      De Redux store moet als parameter meegeven kunnen worden aan de <Text code>apolloServer</Text>{' '}
                      methode
                    </li>
                    <li>
                      De store moet doorgegeven worden aan je <Text code>resolvers</Text>. <Text code>resolvers</Text>{' '}
                      is nu nog een object. Maak hier een functie van die een store als parameter accepteert en een
                      object retourneert.
                    </li>
                    <li>
                      De <Text code>catalogLandTypes</Text> resolver, geeft nu direct een object terug met een paar
                      vaste waardes.
                      <br />
                      Verander dit en geef het resultaat terug van het aanroepen van een <Text italic>selector</Text> (
                      <Text code>getCatalogLandTypes</Text>)<br />
                      <Text italic>
                        Een selector verwacht een state als parameter. Met <Text code>store.getState()</Text> krijg je
                        de huidige state terug.
                      </Text>
                    </li>
                    <li>
                      De test <Text code>view-catalog-land-types.spec.ts</Text> moet ook aangepast worden.
                      <br />
                      Importeer de store en geef deze mee als argument aan de <Text code>apolloServer</Text> methode
                      <br />
                      <Text italic>
                        Als je nu direct de test draait, zal je zien dat er een response zonder land types wordt
                        teruggegeven. Dit komt door de <Text code>initialState</Text> van de store
                      </Text>
                      <br />
                      Door nu gebruik te maken van de <Text italic>reducers</Text> kan je testdata toevoegen en/of
                      wijzigen tijdens de test.
                      <br />
                      Gebruik bijv. <Text code>addLandTypes</Text> en <Text code>removeLandTypes</Text> op meerdere
                      plekken in de testcase om land types toe te voegen of te verwijderen en deze als response in de
                      frontend terug te krijgen.
                    </li>
                  </ul>
                </Paragraph>
                <Paragraph>
                  Een reducer is niet een functie die je zo kunt aanroepen, het is een <Text italic>action</Text> die je{' '}
                  <Text strong>moet</Text> uitvoeren doormiddel van de <Text code>store.dispatch</Text> methode.
                  <br />
                  Bijv. <Text code>store.dispatch(addLandTypes(payload?))</Text>
                </Paragraph>

                <Paragraph>
                  Deze opdracht is afgerond als je de Playwright test <Text code>view-catalog-land-types.spec.ts</Text>{' '}
                  succesvol kan uitvoeren en je tijdens de test data hebt toegevoegd of gewijzigd.
                  <br />
                  Maak zelf extra <Text italic>slices en selectors</Text> aan en breidt de store hiermee uit.
                  <br />
                  Maak extra testcases aan om ook andere pagina's en GraphQL queries te testen.
                </Paragraph>
                <Paragraph>
                  Bekijk <Text strong>Meer info</Text> om een voorbeeld te zien hoe je het <Text code>test</Text> object
                  van Playwright kan extenden, zodat je maar één keer de <Text code>route</Text> hoeft te beschrijven
                  voor alles testcases.
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
            children: (
              <>
                <Paragraph>
                  <Text strong>Extend Playwright test</Text>
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
                <Text strong>apollo-server.ts</Text>
                <SyntaxHighlighter
                  customStyle={{ border: '1px lightgrey solid', fontSize: '12px' }}
                  lineNumberStyle={{ color: 'black', opacity: '0.4' }}
                  language="typescript"
                  showLineNumbers
                  style={docco}
                >
                  {solutionApolloServer.trim()}
                </SyntaxHighlighter>
                <Text strong>view-catalog-land-types.spec.ts</Text>
                <SyntaxHighlighter
                  customStyle={{ border: '1px lightgrey solid', fontSize: '12px' }}
                  lineNumberStyle={{ color: 'black', opacity: '0.4' }}
                  language="typescript"
                  showLineNumbers
                  style={docco}
                >
                  {solutionApolloServer.trim()}
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
    catalogLandTypes: () => {
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

export default PanelAssignment05;
