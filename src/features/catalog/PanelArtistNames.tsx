import { CloseCircleFilled, LoadingOutlined, RetweetOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Badge, Button, Collapse, CollapsePanelProps, Divider, List, Space, Spin, Typography } from 'antd';
import React from 'react';
import { GqlCatalogArtistNamesQuery } from '../../graphql-schema.generated';
import { queries } from './gql-operations';

const { Panel } = Collapse;
const { Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PanelArtistNames: React.FC<CollapsePanelProps> = props => {
  const { loading, error, data, refetch } = useQuery<GqlCatalogArtistNamesQuery>(queries.catalogArtistNames, {
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
      <Button onClick={() => refetch()} size="small" type="primary" icon={<RetweetOutlined />} loading={loading}>
        refresh
      </Button>
      <Divider plain />
      <Badge.Ribbon style={{ zIndex: 99 }} text={`${data?.catalogArtistNames.total_values} artiesten`} />
      {/*<Text >{data?.catalogArtistNames.total_values} Artiesten</Text>*/}
      <List
        style={{ overflow: 'auto', maxHeight: '300px' }}
        dataSource={data?.catalogArtistNames.data}
        size="small"
        renderItem={item => (
          <List.Item>
            <Text>{item}</Text>
          </List.Item>
        )}
      />
    </Panel>
  );
};

export default PanelArtistNames;
