import { RightCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Collapse, Divider, Layout, Typography } from 'antd';
import React from 'react';
import PanelArtistNames from './PanelArtistNames';
import PanelLandType from './PanelLandType';

const { Content } = Layout;
const { Text } = Typography;

const Catalog: React.FC = () => {
  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Catalog</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Text strong>Catalog</Text>
        <Divider orientation="left">result</Divider>
        <Collapse
          destroyInactivePanel={true}
          expandIcon={({ isActive }) => <RightCircleOutlined rotate={isActive ? 90 : 0} />}
        >
          <PanelArtistNames header="Artist names" key="A" />
          <PanelLandType header="Land types" key="L" />
        </Collapse>
      </div>
    </Content>
  );
};

export default Catalog;
