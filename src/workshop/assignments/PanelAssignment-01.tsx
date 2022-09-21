import { Button, Checkbox, Collapse, CollapsePanelProps, Divider, Tabs, Typography } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

const PanelAssignment01: React.FC<
  CollapsePanelProps & {
    setActiveKey: (value: string | string[] | ((val: string | string[]) => string | string[])) => void;
  }
> = props => {
  const [solutionEnabled, setSolutionEnabled] = useLocalStorage('workshop:solutionEnabled:01', false);
  const [finished, setFinished] = useLocalStorage('workshop:assignment:01', false);

  const onClick = () => {
    // e.stopPropagation();
    setFinished(true);
    props.setActiveKey('assignment:02');
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
                  In deze eerste opdracht gaan we een Apollo server toevoegen die we later gaan gebruiken om gemockte
                  responses te versturen.
                  <br />
                  Op{' '}
                  <a
                    href="https://www.apollographql.com/docs/apollo-server/testing/mocking/#using-default-mocks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    deze pagina
                  </a>
                  vind je uitleg hoe je de ApolloServer constructor gebruikt.
                </Paragraph>
                <Paragraph>
                  We maken voor deze opdracht gebruik van het standaard mock gedrag van Apollo server.
                  <br />
                  Pas <Text code>test/apollo-server.ts</Text> aan en volg het voorbeeld, zoals beschreven in de
                  documentatie.
                </Paragraph>
                <Paragraph>
                  Deze opdracht is afgerond als je succesvol het script{' '}
                  <Text code copyable>
                    npm run start:apollo
                  </Text>{' '}
                  kan draaien.
                </Paragraph>
                <Paragraph>
                  Je Apollo server draait nu op poort <Text code>4000</Text> (standaard). <br />
                  Herstart nu deze webapplicatie, waarbij je met een environment variabele de GraphQL URI aanpast en
                  laat wijzen naar jouw Apollo server die lokaal draait.
                  <br />
                  Als je nu de requests bekijkt in de network tab, zal je zien dat de GraphQL queries falen, omdat deze
                  niet bekend zijn bij je Apollo server.
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

                <Paragraph>
                  Open <Text code>src/index.tsx</Text> om te zien welke environment variabele gebruikt wordt voor de
                  graphqlUri. Of maak een <Text code>.env</Text> bestand aan, op basis van{' '}
                  <Text code>.env.example</Text>. Herstart de webapplicatie met <Text code>npm start</Text>.
                </Paragraph>
                <Paragraph>
                  De plugin die je in de oplossing ziet staan, zorgt ervoor dat je ook voor eigen mock server een
                  Playground pagina hebt. Ga naar{' '}
                  <a href="http://localhost:4000/" target="_blank" rel="noopener noreferrer">
                    http://localhost:4000/
                  </a>{' '}
                  om deze te bekijken.
                </Paragraph>
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
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const server = new ApolloServer({
  typeDefs,
  mocks: true,
});

server.listen().then(({ url }) => {
  console.log(\`🚀 Server ready at \${url}\`);
});
`;

export default PanelAssignment01;
