import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Alert, Breadcrumb, Card, Divider, Image, Layout, List, Space, Spin, Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  GqlCardSearchQuery,
  GqlCardSearchQueryVariables,
  GqlSetByCodeQuery,
  GqlSetByCodeQueryVariables,
} from '../../graphql-schema.generated';
import { queries } from './gql-operations';
import { queries as cardQueries } from '../card/gql-operations';

const { Content } = Layout;
const { Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Set: React.FC = () => {
  let params = useParams<{ setCode: string }>();
  const { loading, error, data } = useQuery<GqlSetByCodeQuery, GqlSetByCodeQueryVariables>(queries.set, {
    variables: { code: params.setCode ?? '' },
  });
  const {
    loading: cardLoading,
    error: cardError,
    data: cardData,
  } = useQuery<GqlCardSearchQuery, GqlCardSearchQueryVariables>(cardQueries.cardSearch, {
    skip: !params.setCode,
    variables: { q: `set:${params.setCode}`, unique: 'prints' },
  });

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Sets</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>{data?.setByCode.name ?? 'unknown'}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Space direction="vertical">
          <Text strong>{`${data?.setByCode.name} (${data?.setByCode.code})` ?? 'unknown'}</Text>
          <Text>{`${data?.setByCode.card_count} cards - Released ${data?.setByCode.released_at}`}</Text>
        </Space>
        <Divider orientation="left">result</Divider>
        {loading || cardLoading ? <Spin indicator={antIcon} /> : null}
        {error || cardError ? <Alert message={error?.message ?? cardError?.message} type="error" showIcon /> : null}
        {cardData?.cardSearch.data ? (
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={cardData.cardSearch.data}
            renderItem={card => (
              <List.Item>
                <Card size="small" cover={<img alt={card.name} src={card.image_uris.normal!} loading="lazy" />}>
                  <Space align="baseline">
                    <Text strong style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                      {card.name}
                    </Text>
                    {(card.mana_cost?.match(/\w/g) ?? []).map((symbol, idx) => (
                      <Image
                        key={`${symbol}-${idx}`}
                        src={`https://c2.scryfall.com/file/scryfall-symbols/card-symbols/${symbol}.svg`}
                        preview={false}
                        width="1.2rem"
                      />
                    ))}
                  </Space>
                  <Divider plain />
                  <Text>{card.type_line}</Text>
                  <Divider plain />
                  <Space direction="vertical">
                    <Text>{card.oracle_text}</Text>
                    <Text italic>"{card.flavor_text}"</Text>
                  </Space>
                  <Divider plain />
                  <Text strong>{`${card.power} / ${card.toughness}`}</Text>
                </Card>
              </List.Item>
            )}
          />
        ) : null}
      </div>
    </Content>
  );
};

export default Set;
