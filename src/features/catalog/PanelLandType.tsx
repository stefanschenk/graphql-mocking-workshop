import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Collapse, CollapsePanelProps, List, Space, Spin, Tag, Typography } from 'antd';
import React from 'react';
import { GqlCatalogLandTypesQuery } from '../../graphql-schema.generated';
import { queries } from './gql-operations';

const { Panel } = Collapse;
const { Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PanelLandType: React.FC<CollapsePanelProps> = props => {
  const { loading, error, data } = useQuery<GqlCatalogLandTypesQuery>(queries.catalogLandTypes, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  const extra = () => {
    if (loading) {
      return <Spin indicator={antIcon} />;
    } else if (error) {
      return (
        <Space>
          <CloseCircleFilled style={{ color: 'red' }} />
          <Text style={{ color: 'red' }} ellipsis={true}>
            {error.message}
          </Text>
        </Space>
      );
    } else {
      return null;
    }
  };

  return (
    <Panel {...props} extra={extra()}>
      <List
        grid={{ gutter: 2 }}
        dataSource={data?.catalogLandTypes.data}
        renderItem={item => (
          <List.Item>
            <Tag color="geekblue" style={{ borderRadius: '6px', fontSize: '1rem', padding: '6px 20px' }}>
              {item}
            </Tag>
          </List.Item>
        )}
      />
    </Panel>
  );
};

export default PanelLandType;
