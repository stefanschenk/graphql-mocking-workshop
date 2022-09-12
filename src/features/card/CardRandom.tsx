import { LoadingOutlined, RetweetOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Image,
  Layout,
  List,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from 'antd';
import React from 'react';
import { GqlCardRandomQuery } from '../../graphql-schema.generated';
import { queries } from './gql-operations';

const { Content } = Layout;
const { Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CardRandom: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<GqlCardRandomQuery>(queries.cardRandom, {
    notifyOnNetworkStatusChange: true,
  });

  const imageSrc = data?.cardRandom.image_uris.normal ?? 'empty';
  const symbols = data?.cardRandom.mana_cost?.match(/\w/g) ?? [];

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Random Card</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Space>
          <Text strong>Show a random card</Text>
          <Button onClick={() => refetch()} type="primary" icon={<RetweetOutlined />} loading={loading}>
            refresh
          </Button>
        </Space>
        <Divider orientation="left">result</Divider>
        {loading ? <Spin indicator={antIcon} /> : null}
        {error ? <Alert message={error.message} type="error" showIcon /> : null}
        {data?.cardRandom ? (
          <>
            <Row gutter={16}>
              <Col flex="300px">
                <Image
                  loading="lazy"
                  width={300}
                  src={imageSrc}
                  fallback="data:image/webp;base64,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"
                />
              </Col>
              <Col flex="360px">
                <Card
                  size="small"
                  title={
                    <Space align="baseline">
                      <Text strong style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                        {data.cardRandom.name}
                      </Text>
                      {symbols.map((symbol, idx) => (
                        <Image
                          key={`${symbol}-${idx}`}
                          src={`https://c2.scryfall.com/file/scryfall-symbols/card-symbols/${symbol}.svg`}
                          preview={false}
                          width="1.2rem"
                        />
                      ))}
                    </Space>
                  }
                >
                  <Text>{data.cardRandom.type_line}</Text>
                  <Divider plain />
                  <Text>{data.cardRandom.oracle_text}</Text>
                  <br />
                  <Text italic>"{data.cardRandom.flavor_text}"</Text>
                  <Text strong>{`${data.cardRandom.power} / ${data.cardRandom.toughness}`}</Text>
                  {/*<Text strong>{`Illustrated by: ${data.cardRandom.illustration_id}`}</Text>*/}
                  <Divider plain />
                  <Tag color="geekblue">{data.cardRandom.rarity}</Tag>
                  <Divider orientation="left" plain>
                    Legalities
                  </Divider>
                  <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={Object.entries(data.cardRandom.legalities).filter(
                      ([key, value]) => key !== '__typename',
                    )}
                    renderItem={([key, value]) => (
                      <>
                        <Tag
                          color={value === 'LEGAL' ? '#87d068' : undefined}
                          title={key}
                          style={{ fontSize: '10px', fontWeight: '400', textAlign: 'center', width: '70px' }}
                        >
                          {value.replace('_', ' ')}
                        </Tag>
                        <Text style={{ fontSize: '10px' }}>{key}</Text>
                      </>
                    )}
                  />
                </Card>
              </Col>
              <Col flex="auto" />
            </Row>
          </>
        ) : null}
      </div>
    </Content>
  );
};

export default CardRandom;
