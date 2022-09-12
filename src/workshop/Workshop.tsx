import { Breadcrumb, Button, Checkbox, Collapse, Divider, Image, Layout, Space, Typography } from 'antd';
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import PanelAssignment01 from './assignments/PanelAssignment-01';
import PanelAssignment02 from './assignments/PanelAssignment-02';
import diagram from './simple-diagram.svg';

const { Content } = Layout;
const { Paragraph, Text } = Typography;
const { Panel } = Collapse;

const Workshop: React.FC = () => {
  const [finished, setFinished] = useLocalStorage('workshop:intro', false);
  const [activeKey, setActiveKey] = useLocalStorage<string | string[]>('workshop:active', 'intro');

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // e.stopPropagation();
    setFinished(true);
    setActiveKey('assignment_01');
  };

  const onPanelChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Welcome</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Text strong>Workshop testing an UI application with GraphQL mocking</Text>
        <Divider plain />
        <Collapse accordion activeKey={activeKey} defaultActiveKey="intro" onChange={onPanelChange}>
          <Panel
            header="Introductie"
            key="intro"
            extra={
              <Checkbox checked={finished} disabled>
                afgerond
              </Checkbox>
            }
          >
            <Paragraph>
              In deze workshop gaan we aan de slag met Apollo GraphQL, Redux (SQLite) en Playwright om een test op te
              zetten die gebruik maakt van gesimuleerde data in plaats van de echte GraphQL server.
            </Paragraph>
            <Paragraph>
              Op de volgende pagina's kan je informatie vinden over onderdelen die we gebruiken tijdens deze workshop
              <ul>
                <li>
                  <a href="src/workshop/Workshop" target="_blank" rel="noopener noreferrer">
                    Apollo GraphQL Mocking
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
                  <a href="src/workshop/Workshop" target="_blank" rel="noopener noreferrer">
                    KnexJS docs
                  </a>{' '}
                  (query builder for SQLite)
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
                <li>Node version v16.15.x</li>
                <li>An IDE, eg. IntelliJ or VSCode</li>
                <li>experience with Javascript, preferable Typescript and running npm scripts</li>
                <li>previous experience with (Apollo) GraphQL is not required</li>
              </ul>
            </Paragraph>
            <Space align="start">
              <Paragraph>
                Deze applicatie die we gebruiken om onze testen tegen te schrijven, is geschreven in React en maakt
                gebruik van <Text code>@apollo/client</Text> om te communiceren met de GraphQL server.
                <br />
                De GraphQL server is bereikbaar op{' '}
                <a href="https://klankentapper.ssk-hosting.nl/graphql/data" target="_blank" rel="noopener noreferrer">
                  https://klankentapper.ssk-hosting.nl/graphql/data
                </a>{' '}
                (klik op de link om de GraphQL Playground te openen)
                <br />
                Elk van de menu items links, opent een pagina waarop het resultaat van een of meerdere GraphQL queries
                wordt getoond. De data die we tonen, wordt via de GraphQL server, opgehaald bij{' '}
                <a href="https://scryfall.com/docs/api" target="_blank" rel="noopener noreferrer">
                  scryfall.com
                </a>{' '}
                een API voor <Text strong>Magic: The Gathering</Text> kaarten.
                <br />
                Afbeeldingen die getoond worden, worden <Text underline>niet</Text> gequeried via GraphQL, maar worden
                direct opgehaald bij een scryfall CDN.
                <Divider plain />
                Verder op deze pagina vind je alle opdrachten die we gaan doen, met extra benodigde instructies.
              </Paragraph>
              <Image src={diagram} width="600px" preview={false} />
            </Space>
            <Button onClick={onClick} size="small" shape="round" type="primary">
              Next
            </Button>
          </Panel>
          <PanelAssignment01 key="assignment_01" header="Opdracht 1 - Maak een Apollo GraphQL server aan" />
          <PanelAssignment02 key="assignment_02" header="Opdracht 2 - " />
        </Collapse>
      </div>
    </Content>
  );
};

export default Workshop;
