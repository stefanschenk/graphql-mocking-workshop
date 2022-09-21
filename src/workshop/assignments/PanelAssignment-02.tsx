import { Button, Checkbox, Collapse, CollapsePanelProps, Divider, Space, Tabs, Typography } from 'antd';
import { CheckOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

const PanelAssignment02: React.FC<
  CollapsePanelProps & {
    setActiveKey: (value: string | string[] | ((val: string | string[]) => string | string[])) => void;
  }
> = props => {
  const [solutionEnabled, setSolutionEnabled] = useLocalStorage('workshop:solutionEnabled:02', false);
  const [finished, setFinished] = useLocalStorage('workshop:assignment:02', false);

  const onClick = () => {
    // e.stopPropagation();
    setFinished(true);
    props.setActiveKey('assignment:03');
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
                  Op{' '}
                  <a
                    href="https://www.apollographql.com/docs/apollo-server/testing/mocking#customizing-mocks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    deze pagina
                  </a>{' '}
                  staat de documentatie van Apollo server voor het aanpassen van mocks.
                  <br />
                  We gaan nu <Text code>apollo-server.ts</Text> aanpassen en een query toevoegen aan de{' '}
                  <Text code>typedefs</Text> en een resolver die ons gaat voorzien van de juiste response.
                  <br />
                  De query die we hiervoor gaan gebruiken is <Text strong>catalog - land types</Text>
                </Paragraph>
                <Paragraph>
                  Ga naar de{' '}
                  <a href="https://klankentapper.ssk-hosting.nl/graphql/data" target="_blank" rel="noopener noreferrer">
                    GraphQL Playground
                  </a>{' '}
                  en bekijk de query <Text code>catalogLandTypes</Text>. Je kan de query aanklikken, om te zien welke
                  velden in de response horen te zitten.
                  <br />
                  Voeg de query toe aan de <Text code>typedefs</Text> in <Text strong>apollo-server.ts</Text> en voeg
                  een resolver functie toe die een object terug geeft, wat voldoet aan de query.
                </Paragraph>
                <Paragraph>
                  Het standaard gedrag voor mocks is, dat deze resolvers die in het schema zitten, overschrijven.
                  <br />
                  Als je wilt dat jouw resolvers worden gebruikt in de mock response, moet je de optie
                  <Text code>mockEntireSchema</Text> in je Apollo server op <Text code>true</Text> zetten.
                </Paragraph>

                <Paragraph>
                  Deze opdracht is afgerond als in de app naar{' '}
                  <Space>
                    <MenuOutlined />
                    <Text strong>Catalog</Text>
                  </Space>{' '}
                  gaat en je jouw gesimuleerde response terugziet in het panel Land types
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
                  <Text strong>Resolver</Text>
                  <br />
                  Een resolver is een functie die ervoor zorgt dat de data voor een veld in het schema wordt gevuld. In
                  onze GraphQL server, wordt de resolver gebruikt om data op te halen bij een REST endpoint en deze data
                  terug te geven in een response object. In de mock oplossing moet de resolver een object terug geven
                  wat voldoet aan de beschreven GraphQL query. Stel als voorbeeld dat de query er als volgt uitziet.
                  <SyntaxHighlighter customStyle={{ fontSize: '12px' }} language="gql" style={docco}>
                    {moreInfoQueryExample.trim()}
                  </SyntaxHighlighter>
                  De titel en de auteur zijn verplichte velden (te herkennen aan de <Text code>!</Text> achter het
                  veldtype. Het aantal pagina's is optioneel gevuld.
                  <br /> Daarmee kan de resolver er als volgt uit zien
                  <SyntaxHighlighter customStyle={{ fontSize: '12px' }} language="typescript" style={docco}>
                    {moreInfoResolverExample.trim()}
                  </SyntaxHighlighter>
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
                <Paragraph>
                  Zoals je kan zien in de resolver functie in onderstaande oplossing, is niet elke veld opgenomen in de
                  response, wat wel is beschreven in het query return type.
                  <br />
                  Eén van de voordelen van een Apollo mock server gebruiken, is dat je niet zelf de volledige response
                  hoeft te maken.
                  <br />
                  Alle velden die niet in jouw resolver zitten, worden automatisch toegevoegd met een standaard waarde.
                </Paragraph>
                <Divider orientation="left">
                  <Text
                    style={{ fontSize: '0.9rem' }}
                    copyable={{
                      text: solution,
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

const moreInfoQueryExample = `
type Query {
  book: Book!
}

type Book {
  title: String!
  author: String!
  pages: Int
}
`;
const moreInfoResolverExample = `
Query: {
  book: () => ({
    title: 'GraphQL in Action'
    author: 'Samer Buna'
    pages: 375
  })
}
`;

const solution = `
/**
 * This file will be used in all assignments - it will contain all the code for your mock Apollo server
 */
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql\`
  type CatalogType {
    object: String!
    uri: String!
    total_values: Int!
    data: [String!]!
  }

  type Query {
    hello: String
    catalogLandTypes: CatalogType
  }
\`;

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
  typeDefs,
  resolvers,
  mocks: true,
  mockEntireSchema: false,
});

server.listen().then(({ url }) => {
  console.log(\`🚀 Server ready at \${url}\`);
});

`;

export default PanelAssignment02;
