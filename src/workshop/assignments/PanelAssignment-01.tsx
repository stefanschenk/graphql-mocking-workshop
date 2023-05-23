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
                  In this first task, we will add an Apollo server that we will later use to send mocked responses.
                  <br />
                  At{' '}
                  <a
                    href="https://www.apollographql.com/docs/apollo-server/testing/mocking/#customizing-mocks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    this page
                  </a>{' '}
                  you will find an explanation on how to start with ApolloServer and customizing mocks.
                </Paragraph>
                <Paragraph>
                  We are not looking at the <Text italic>Enabling mocks</Text> paragraph, because that part assumes we
                  are using types and resolvers. But at this moment we will be creating our own.
                </Paragraph>
                <Paragraph>
                  For this task, we will utilize the default mocking behavior of Apollo server.
                  <br />
                  Modify <Text code>test/apollo-server.ts</Text> and follow the example as described in the
                  documentation.
                </Paragraph>
                <Paragraph>
                  This assignment is completed when you are able to successfully run the script{' '}
                  <Text code copyable>
                    npm run start:apollo
                  </Text>
                </Paragraph>
                <Paragraph>
                  Your Apollo server is now running on port <Text code>4000</Text> (by default).
                  <br />
                  Now change the GRAPHQL URI in the <Text code>.env</Text> file to point to this local running server
                  and restart this web application
                  <br />
                  If you now check the requests in the network tab, you will notice that the GraphQL queries fail
                  because they are not recognized by your Apollo server.
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
                  Open <Text code>src/index.tsx</Text> to see which environment variable is used for the graphqlUri.
                  Alternatively, create a <Text code>.env</Text> file based on <Text code>.env.example</Text>.<br />
                  Restart the web application using <Text code>npm start</Text>.
                </Paragraph>
                <Paragraph>
                  The code in the solution provides a Playground page for your own mock server as well. Go to{' '}
                  <a href="http://localhost:4000/" target="_blank" rel="noopener noreferrer">
                    http://localhost:4000/
                  </a>{' '}
                  to view this page.
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
import { ApolloServer } from '@apollo/server';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`#graphql
  type Query {
    hello: String
    resolved: String
  }
\`;

const resolvers = {
  Query: {
    resolved: () => 'Resolved',
  },
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
  }),
});

startStandaloneServer(server, { listen: { port: 4000 } }).then(result =>
  console.log(\`🚀 Server listening at: \${result.url}\`),
);
`;

export default PanelAssignment01;
