import { Alert, Button, Checkbox, Collapse, CollapsePanelProps, Divider, Space, Tabs, Typography } from 'antd';
import { CaretRightOutlined, MenuOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

const PanelAssignment03: React.FC<
  CollapsePanelProps & {
    setActiveKey: (value: string | string[] | ((val: string | string[]) => string | string[])) => void;
  }
> = props => {
  const [solutionEnabled, setSolutionEnabled] = useLocalStorage('workshop:solutionEnabled:03', false);
  const [finished, setFinished] = useLocalStorage('workshop:assignment:03', false);

  const onClick = () => {
    // e.stopPropagation();
    setFinished(true);
    props.setActiveKey('assignment:04');
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
                  In de vorige opdracht heb je zelf het GraphQL schema moeten schrijven met een{' '}
                  <Text code>gql template string</Text>.<br />
                  Om alle queries en mutaties van een GraphQL server te kunnen mocken, moeten alle operatie en types
                  gedefinieerd zijn in het schema (<Text italic>typedefs</Text>). Dit is veel werk om zelf te schrijven.
                  <br />
                  Gelukkig is het mogelijk om onze mock Apollo server te voorzien van een schema op basis van het schema
                  van de echte GraphQL server.
                </Paragraph>
                <Paragraph>
                  Meer informatie hierover kan je vinden in de documentatie van Apollo server op{' '}
                  <a
                    href="https://www.apollographql.com/docs/apollo-server/testing/mocking/#mocking-a-schema-using-introspection"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    deze pagina
                  </a>
                </Paragraph>
                <Paragraph>
                  Om deze applicatie te maken, wordt al gebruik gemaakt van een{' '}
                  <a
                    href="https://www.the-guild.dev/graphql/codegen/docs/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GraphQL Code Generator
                  </a>
                  <br />
                  Het schema wat hiermee gegenereerd wordt, kunnen we <Text strong>ook</Text> gebruiken om onze mock
                  Apollo server te maken.
                </Paragraph>
                <Paragraph>
                  In de <Text code>package.json</Text> staat het{' '}
                  <Text code copyable>
                    graphql-codegen:remote
                  </Text>{' '}
                  script. Dit script genereert een <Text code>*.generated.ts</Text> bestand, waarin alle types worden
                  beschreven, wat je kan gebruiken in een Typescript applicatie.
                  <br />
                  En er wordt een <Text code>*.schema.json</Text> bestand gemaakt als <Text italic>introspection</Text>{' '}
                  resultaat. Dit schema kunnen we gebruiken in onze mock Apollo server.
                </Paragraph>
                <Divider plain />
                <Paragraph>
                  Pas nu <Text code>apollo-server.ts</Text> zo aan, dat het gegeneerde schema als schema voor je mock
                  server gebruikt wordt.
                </Paragraph>

                <Paragraph>
                  Deze opdracht is afgerond als je{' '}
                  <Text code copyable>
                    npm run start:apollo
                  </Text>{' '}
                  zonder errors kan draaien.
                  <br />
                  Als je nu de diverse menu items doorloopt, zouden er geen errors meer getoond moeten worden en zie je
                  overal de standaard gesimuleerde waardes terug. En bij{' '}
                  <Space>
                    <MenuOutlined />
                    <Text strong>Catalog</Text>
                  </Space>{' '}
                  zou je nog steeds jouw eigen gesimuleerde response moeten terug zien, die we bij opdracht 2 hebben
                  gemaakt.
                  <br />
                  Nu is het een goed moment om voor een of meer andere queries ook een resolver te schrijven, als je dat
                  wilt.
                  <br />
                  Denk eraan dat je niet het volledige response object hoeft te schrijven, je hoeft alleen die velden
                  een waarde te geven die je zelf belangrijk vindt. Alle andere velden worden automatisch gevuld door de
                  mock Apollo server.
                  <br />
                  <br />
                  <Collapse
                    style={{ maxWidth: '500px' }}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  >
                    <Panel
                      key={1}
                      header={
                        <Space>
                          Ik zie bij <Text italic>Land types</Text> alleen maar "Hello World" en niet mijn data.
                        </Space>
                      }
                    >
                      Nu we een introspection schema gebruiken om onze mock server van een schema te voorzien, werkt het
                      niet meer om het <Text code>resolvers</Text> object mee te geven aan het{' '}
                      <Text italic>resolvers attribuut</Text> van onze Apollo server.
                      <br />
                      Je moet nu het <Text code>resolvers</Text> object toekennen aan het{' '}
                      <Text italic>mocks attribuut</Text>.<br />
                      Bekijk ook de informatie in het <Text strong>Meer info</Text> tabje.
                    </Panel>
                  </Collapse>
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
                  <Text strong>API</Text>
                  <br />
                  De mocking functionaliteit in Apollo server wordt geleverd door de functie{' '}
                  <Text code>addMocksToSchema</Text> uit
                  <br />
                  de <Text strong>@graphql-tools/mock</Text> package. Het <Text code>mocks</Text> object wordt direct
                  doorgegeven aan de <Text code>addMocksToSchema</Text>
                  functie.
                  <br />
                  Apollo server ondersteunt niet alle argumenten die <Text code>addMocksToSchema</Text> kent, waaronder{' '}
                  <Text strong>resolvers.</Text>
                </Paragraph>
                <Paragraph>
                  <a href="https://www.graphql-tools.com/docs/mocking" target="_blank" rel="noopener noreferrer">
                    https://www.graphql-tools.com/docs/mocking
                  </a>
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
                <SyntaxHighlighter
                  customStyle={{ border: '1px lightgrey solid', fontSize: '12px' }}
                  lineNumberStyle={{ color: 'black', opacity: '0.4' }}
                  language="typescript"
                  showLineNumbers
                  style={docco}
                >
                  {solution.trim()}
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

const solution = `
/**
 * This file will be used in all assignments - it will contain all the code for your mock Apollo server
 */
import { buildClientSchema } from 'graphql';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const introspectionResult = require('../graphql.schema.json');

const schema = buildClientSchema(introspectionResult);

const resolvers = {
  Query: {
    catalogLandTypes: () => {
      return {
        data: ['weiland', 'steppe', 'woestijn'],
      };
    },
  },
};

const server = new ApolloServer({
  schema,
  mocks: resolvers,
  mockEntireSchema: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(\`🚀 Server ready at \${url}\`);
});

`;

export default PanelAssignment03;
