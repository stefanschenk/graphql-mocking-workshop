import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Alert, Breadcrumb, Divider, Image, Layout, Spin, Table, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GqlSetListQuery } from '../../graphql-schema.generated';
import { queries } from './gql-operations';

const { Content } = Layout;
const { Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const columns = [
  {
    title: 'Icon',
    dataIndex: 'icon_svg_uri',
    key: 'icon',
    render: (uri: string) => <Image src={uri} preview={false} width="1.4rem" />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Cards',
    dataIndex: 'card_count',
    key: 'count',
  },
  {
    title: 'Released',
    dataIndex: 'released_at',
    key: 'released',
  },
  {
    title: 'Set type',
    dataIndex: 'set_type',
    key: 'type',
  },
];

const SetList: React.FC = () => {
  const { loading, error, data } = useQuery<GqlSetListQuery>(queries.setList);
  let navigate = useNavigate();

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Sets</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Text strong>View a list of all Sets.</Text>
        <Divider orientation="left">result</Divider>
        {loading ? <Spin indicator={antIcon} /> : null}
        {error ? <Alert message={error.message} type="error" showIcon /> : null}
        {data?.sets ? (
          <Table
            style={{ cursor: 'pointer' }}
            dataSource={data.sets.data}
            columns={columns}
            rowKey="code"
            pagination={{ pageSize: 30, showSizeChanger: false }}
            size="small"
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  navigate(`${record.code}`);
                }, // click row
              };
            }}
          />
        ) : null}
      </div>
    </Content>
  );
};

export default SetList;
