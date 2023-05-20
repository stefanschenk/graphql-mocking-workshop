import { Breadcrumb, Button, Checkbox, Collapse, Divider, Image, Layout, Space, Typography } from 'antd';
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import PanelAssignment01 from './assignments/PanelAssignment-01';
import PanelAssignment02 from './assignments/PanelAssignment-02';
import PanelAssignment03 from './assignments/PanelAssignment-03';
import PanelAssignment04 from './assignments/PanelAssignment-04';
import PanelAssignment05 from './assignments/PanelAssignment-05';
import diagram from './simple-diagram.svg';

const { Content } = Layout;
const { Paragraph, Text } = Typography;
const { Panel } = Collapse;

const Workshop: React.FC = () => {
  const [finished, setFinished] = useLocalStorage('workshop:intro', false);
  const [activeKey, setActiveKey] = useLocalStorage<string | string[]>('workshop:active', 'intro');

  const onClick = () => {
    // e.stopPropagation();
    setFinished(true);
    setActiveKey('assignment:01');
  };

  const onPanelChange = (key: string | string[]) => {
    if (key !== 'intermission') setActiveKey(key);
  };

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Welcome</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Text strong>
          Workshop create testdata mocks using GraphQL and Redux
          <br />
        </Text>
        <Text>and use it to test a UI application</Text>
        <Divider plain />
        <Collapse accordion activeKey={activeKey} defaultActiveKey="intro" onChange={onPanelChange}>
          <Panel
            header="Introduction"
            key="intro"
            extra={
              <Checkbox checked={finished} disabled>
                completed
              </Checkbox>
            }
          >
            <Paragraph>
              In this workshop, we will work with Apollo GraphQL, Redux and Playwright to set up a test that utilizes
              simulated data instead of the actual GraphQL server.
            </Paragraph>
            <Paragraph>
              On the following pages, you can find information about the components we will be using during this
              workshop.
              <ul>
                <li>
                  <a
                    href="https://www.apollographql.com/docs/apollo-server/v2/testing/mocking"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apollo GraphQL Mocking (v2)
                  </a>
                </li>
                <li>
                  <a
                    href="https://redux-toolkit.js.org/introduction/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Redux Toolkit docs
                  </a>
                </li>
                <li>
                  <a href="https://playwright.dev/docs/intro" target="_blank" rel="noopener noreferrer">
                    Playwright docs
                  </a>
                </li>
              </ul>
            </Paragraph>
            <Paragraph>
              What do you need for this workshop?
              <ul>
                <li>
                  Clone this repo from{' '}
                  <Text underline copyable>
                    https://github.com/stefanschenk/graphql-mocking-workshop.git
                  </Text>
                </li>
                <li>
                  Node version <strong>v16.15.x</strong>
                </li>
                <li>An IDE, eg. IntelliJ or VSCode</li>
                <li>experience with Javascript, preferable Typescript and running npm scripts</li>
                <li>previous experience with (Apollo) GraphQL is not required</li>
              </ul>
            </Paragraph>
            <Space align="start">
              <Paragraph>
                This application, which contains all workshop assignments and is used to write our playwright tests
                against, is written in React and utilizes <Text code>@apollo/client</Text> to communicate with the
                GraphQL server.
                <br />
                The GraphQL server can be reached on{' '}
                <a href="https://klankentapper.ssk-hosting.nl/graphql/data" target="_blank" rel="noopener noreferrer">
                  https://klankentapper.ssk-hosting.nl/graphql/data
                </a>{' '}
                (click on this link to open the GraphQL Playground)
                <br />
                Each of the menu items on the left side, opens a web page on which the result will be shown of one or
                more GraphQL queries. The data that is shown is fetched from the GraphQL server, which in turn fetches
                the data from{' '}
                <a href="https://scryfall.com/docs/api" target="_blank" rel="noopener noreferrer">
                  scryfall.com
                </a>{' '}
                an API for <Text strong>Magic: The Gathering</Text> cards.
                <br />
                The images that are displayed are <Text underline>not</Text> queried via GraphQL, but are directly
                fetched from a Scryfall CDN.
                <Divider plain />
                "Open the developer tools and go to the <Text strong>Network</Text> tab. Then, click on several of the
                menu items on the left. Examine the requests made to the <Text code>data</Text> endpoint. In the{' '}
                <Text strong>Payload</Text> tab, you can see the GraphQL query being requested, and in the{' '}
                <Text strong>Preview</Text> or <Text strong>Response</Text> tab, you can see the response returned from
                the GraphQL server.
                <Divider plain />
                Further on this page, you will find all the tasks we will be doing, along with additional instructions.
              </Paragraph>
              <Image src={diagram} width="600px" preview={false} />
            </Space>
            <Divider plain />
            <Button onClick={onClick} size="small" shape="round" type="primary">
              Next
            </Button>
          </Panel>
          <PanelAssignment01
            key="assignment:01"
            header="Assignment 1 - Create an Apollo GraphQL server"
            setActiveKey={setActiveKey}
          />
          <PanelAssignment02
            key="assignment:02"
            header="Assignment 2 - Adjusting mock response"
            setActiveKey={setActiveKey}
          />
          <PanelAssignment03
            key="assignment:03"
            header="Assignment 3 - Utilize the Graphql schema of the server"
            setActiveKey={setActiveKey}
          />
          <PanelAssignment04
            key="assignment:04"
            header="Assignment 4 - Manipulating test data from within the test :: intercepting GraphQL requests in your test case"
            setActiveKey={setActiveKey}
          />
          <Panel
            key="intermission"
            header={<Text strong>Together - explanation of Redux state based on example files</Text>}
            showArrow={false}
          />
          <PanelAssignment05
            key="assignment:05"
            header="Assignment 5 - Manipulating test data from within the test :: state management"
            setActiveKey={setActiveKey}
          />
        </Collapse>
      </div>
    </Content>
  );
};

export default Workshop;
