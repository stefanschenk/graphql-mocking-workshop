import {
  BookOutlined,
  EyeOutlined,
  HomeOutlined,
  LinkOutlined,
  RetweetOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import CardRandom from './features/card/CardRandom';
import Catalog from './features/catalog/Catalog';
import Set from './features/set/Set';
import SetList from './features/set/SetList';
import Symbology from './features/symbology/Symbology';
import SymbologyParseMana from './features/symbology/SymbologyParseMana';
import Workshop from './workshop/Workshop';

const { Header, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/">Home</Link>, 'home', <HomeOutlined />),
  getItem(<Link to="/random">Random Card</Link>, 'random', <RetweetOutlined />),
  getItem(<Link to="sets/list">Sets</Link>, 'list', <UnorderedListOutlined />),
  getItem('Card Symbols', 'card-symbols', <EyeOutlined />, [
    getItem(<Link to="card-symbols/symbology">Symbology</Link>, 'symbology'),
    getItem(<Link to="card-symbols/parse-mana">Parse Mana Cost</Link>, 'parse-mana'),
  ]),
  getItem(<Link to="/catalog">Catalog</Link>, 'catalog', <BookOutlined />),
  getItem(
    <a href="http://localhost:4000/graphql/data" target="_blank" rel="noopener noreferrer">
      GraphQL Playground
    </a>,
    'playground',
    <LinkOutlined />,
  ),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const segments = pathname
    .split('/')
    .filter(segment => segment)
    .reverse();
  const [page, sub] = segments.length === 3 ? segments.slice(1) : segments;

  return (
    <>
      <Layout style={{ minHeight: '100vh' }} hasSider>
        <Sider
          style={{ height: '100vh', position: 'fixed' }}
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultOpenKeys={[sub]}
            defaultSelectedKeys={[page ?? 'home']}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Routes>
            <Route path="/" element={<Workshop />} />
            <Route path="/random" element={<CardRandom />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/card-symbols/symbology" element={<Symbology />} />
            <Route path="/card-symbols/parse-mana" element={<SymbologyParseMana />} />
            <Route path="/sets/list" element={<SetList />} />
            <Route path="/sets/list/:setCode" element={<Set />} />
          </Routes>
          <Footer style={{ textAlign: 'center' }}>Stefan Schenk - deTesters :: Workshop testen met GraphQL</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
