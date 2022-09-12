import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Alert, Breadcrumb, Divider, Image, Layout, Spin, Table, Typography } from 'antd';
import React from 'react';
import { GqlSymbologyQuery } from '../../graphql-schema.generated';
import { queries } from './gql-operations';

const { Content } = Layout;
const { Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const columns = [
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: 'Icon',
    dataIndex: 'svg_uri',
    key: 'icon',
    render: (uri: string) => <Image src={uri} preview={false} width="1.4rem" />,
  },
  {
    title: 'English',
    dataIndex: 'english',
    key: 'english',
  },
  {
    title: 'CMC',
    dataIndex: 'cmc',
    key: 'cmc',
  },
  {
    title: 'Colors',
    dataIndex: 'colors',
    key: 'colors',
  },
];

const Symbology: React.FC = () => {
  const { loading, error, data } = useQuery<GqlSymbologyQuery>(queries.symbology);

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Card Symbols</Breadcrumb.Item>
        <Breadcrumb.Item>Symbology</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Text strong>View a List of all Card Symbols.</Text>
        <Divider orientation="left">result</Divider>
        {loading ? <Spin indicator={antIcon} /> : null}
        {error ? <Alert message={error.message} type="error" showIcon /> : null}
        {data?.symbology ? (
          <Table
            dataSource={data.symbology.data}
            columns={columns}
            rowKey="symbol"
            pagination={{ pageSize: 30, showSizeChanger: false }}
            size="small"
          />
        ) : null}
      </div>
    </Content>
  );
};

export default Symbology;
