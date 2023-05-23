import { LoadingOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import {
  Alert,
  Breadcrumb,
  Button,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  Layout,
  Spin,
  Tag,
  Typography,
} from 'antd';
import React from 'react';
import { GqlSymbologyParseManaQuery, GqlSymbologyParseManaQueryVariables } from '../../graphql-schema.generated';
import { queries } from './gql-operations';

const { Content } = Layout;
const { Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SymbologyParseMana: React.FC = () => {
  const [form] = Form.useForm();
  const [parseMana, { loading, error, data }] = useLazyQuery<
    GqlSymbologyParseManaQuery,
    GqlSymbologyParseManaQueryVariables
  >(queries.symbologyParseMana);

  const onFinish = async () => {
    await parseMana({ variables: { cost: form.getFieldValue('cost') } });
  };

  const symbols = data?.symbologyParseMana.cost.match(/\w/g) ?? [];

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Card Symbols</Breadcrumb.Item>
        <Breadcrumb.Item>Parse Mana</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Text strong>Parse the given Mana Cost</Text>
        <Divider plain />
        <Form form={form} onFinish={onFinish} initialValues={{ cost: '1BG' }}>
          <Form.Item name="cost" label="Mana Cost" rules={[{ required: true }]}>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Divider orientation="left">result</Divider>
        {loading ? <Spin indicator={antIcon} /> : null}
        {error ? <Alert message={error.message} type="error" showIcon /> : null}
        {data?.symbologyParseMana ? (
          <Descriptions title="Parsed Mana Cost" bordered size="small">
            <Descriptions.Item label="cost" span={3}>
              {symbols.map(symbol => (
                <Image
                  key={symbol}
                  src={`https://c2.scryfall.com/file/scryfall-symbols/card-symbols/${symbol}.svg`}
                  preview={false}
                  width="1.4rem"
                />
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="converted mana cost" span={3}>
              {data.symbologyParseMana.cmc}
            </Descriptions.Item>
            <Descriptions.Item label="colors" span={3}>
              {data.symbologyParseMana.colors}
            </Descriptions.Item>
            <Descriptions.Item label="tags" span={3}>
              <Tag.CheckableTag checked={data.symbologyParseMana.colorless}>colorless</Tag.CheckableTag>
              <Tag.CheckableTag checked={data.symbologyParseMana.monocolored}>monocolored</Tag.CheckableTag>
              <Tag.CheckableTag checked={data.symbologyParseMana.multicolored}>multicolored</Tag.CheckableTag>
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </div>
    </Content>
  );
};

export default SymbologyParseMana;
