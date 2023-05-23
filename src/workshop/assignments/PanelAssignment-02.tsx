import { Alert, Button, Checkbox, Collapse, CollapsePanelProps, Divider, Space, Tabs, Typography } from 'antd';
import { BookOutlined, CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Link } from 'react-router-dom';

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
                  At{' '}
                  <a
                    href="https://www.apollographql.com/docs/apollo-server/testing/mocking#customizing-mocks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    this page
                  </a>{' '}
                  documentation can be found for Apollo Server on how to customize mocks
                  <br />
                  We are now going to modify <Text code>apollo-server.ts</Text> and add a new query to the{' '}
                  <Text code>typedefs</Text> and also add a new resolver that will provide us with the correct response.
                  <br />
                  The query we will use for this is <Text strong>catalog - land types</Text>
                </Paragraph>
                <Paragraph>
                  Please go to{' '}
                  <a href="https://klankentapper.ssk-hosting.nl/graphql/data" target="_blank" rel="noopener noreferrer">
                    GraphQL Playground
                  </a>{' '}
                  (actual server) and view the query <Text code>catalogLandTypes</Text>. You can select the query to see
                  which fields should be included in the response.
                  <br />
                  Add the query to the <Text code>typedefs</Text> in <Text strong>apollo-server.ts</Text> and add a
                  resolver function that returns an object that meets the query requirements.
                </Paragraph>
                <Paragraph>
                  The default behavior for mocks is that they override the resolvers defined in the schema.
                  <br />
                  In this case the resolver we just wrote is part of the executable schema. So we would like these
                  resolvers to be used in the mock response. For this you need to set the option{' '}
                  <Text code>preserveResolvers</Text> to <Text code>true</Text> in your Apollo server.
                  <br />
                  See{' '}
                  <a
                    href="https://www.apollographql.com/docs/apollo-server/testing/mocking/#using-existing-resolvers-with-mocks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Using existing resolvers with mocks
                  </a>
                  .<br />
                  Just play around with this property to see the differences.
                </Paragraph>

                <Paragraph>
                  This assignment is completed when you go to{' '}
                  <Link to="/catalog">
                    <Space>
                      <BookOutlined />
                      <Text strong>Catalog</Text>
                    </Space>
                  </Link>{' '}
                  in this app, and you get to see your simulated response in Land types panel
                </Paragraph>

                <Alert
                  message={
                    <>
                      After making changes to <Text code>apollo-server.ts</Text> do not forget to restart the apollo
                      server by running{' '}
                      <Text code copyable>
                        npm run start:apollo
                      </Text>{' '}
                      again.
                    </>
                  }
                  type="info"
                  showIcon
                  style={{ marginBottom: '20px', maxWidth: '900px' }}
                />

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
                  <Text strong>Resolver</Text>
                  <br />A resolver is a function that fills the data for a field in the schema. In our GraphQL server,
                  the resolver is used to fetch data from a REST endpoint and return that data in a response object. In
                  the mock solution, the resolver should return an object that meets the described GraphQL query. Let's
                  consider an example query:
                  <SyntaxHighlighter customStyle={{ fontSize: '12px' }} language="gql" style={docco}>
                    {moreInfoQueryExample.trim()}
                  </SyntaxHighlighter>
                  The title and author are mandatory fields (indicated by the <Text code>!</Text> after the field type),
                  while the number of pages is an optional field.
                  <br />
                  The resolver for this can be implemented as follows:
                  <SyntaxHighlighter customStyle={{ fontSize: '12px' }} language="typescript" style={docco}>
                    {moreInfoResolverExample.trim()}
                  </SyntaxHighlighter>
                  In this example, the resolver function is assigned to the <Text code>Query</Text> type, and
                  specifically to the
                  <Text code>books</Text> field. It returns an object with the mandatory fields <Text code>title</Text>{' '}
                  and
                  <Text code>author</Text>, and an optional field <Text code>pages</Text> that may or may not be
                  included in the response.
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
                <Paragraph>
                  As you can see in the resolver function in the provided solution, not every field is included in the
                  response, even though it is described in the query return type.
                  <br />
                  One of the advantages of using an Apollo mock server is that you don't have to create the entire
                  response yourself.
                  <br />
                  <Text underline>
                    All fields that are not included in your resolver will be automatically added with a default value.
                  </Text>
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
import { ApolloServer } from '@apollo/server';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`#graphql
  type CatalogType {
    object: String!
    uri: String!
    total_values: Int!
    data: [String!]!
  }

  type Query {
    catalogLandTypes: CatalogType
    hello: String
    resolved: String
  }
\`;

const resolvers = {
  Query: {
    catalogLandTypes: () => {
      return {
        data: ['weiland', 'steppe', 'woestijn'],
      };
    },
    resolved: () => 'Resolved',
  },
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    preserveResolvers: true,
  }),
});

startStandaloneServer(server, { listen: { port: 4000 } }).then(result =>
  console.log(\`🚀 Server listening at: \${result.url}\`),
);

`;

export default PanelAssignment02;
